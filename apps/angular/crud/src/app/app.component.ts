import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, finalize, retry, tap } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @defer (when !loading()) {
      @for (todo of todos(); track todo.id) {
        <div>
          {{ todo.title }} |
          <button (click)="update(todo)">Update</button>
          |
          <button (click)="delete(todo.id)">Delete</button>
        </div>
      }
    } @loading (minimum 1000) {
      <mat-progress-spinner
        mode="indeterminate"
        value="50"></mat-progress-spinner>
    } @error {
      <p>There was a problem to load component.</p>
    }
  `,
  styles: [
    `
      .mdc-circular-progress {
        position: absolute;
        transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        margin: auto;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);
  private readonly todosSubject$ = new BehaviorSubject<Todo[]>([]);
  readonly todos = signal<Todo[]>([]);
  loading = signal(true);
  private subject$ = inject(DestroyRef);

  endLoader(): void {
    this.loading.set(false);
  }

  ngOnInit(): void {
    this.todoService
      .getAllTodos()
      .pipe(
        takeUntilDestroyed(this.subject$),
        retry(2),
        finalize(() => this.endLoader()),
        tap((todos) => this.todos.set(todos)),
      )
      .subscribe();
  }

  update(todo: Todo) {
    this.todoService
      .updateSingleTodo(todo)
      .pipe(
        takeUntilDestroyed(this.subject$),
        tap((updatedTodo) => {
          this.todos.update((current) =>
            current.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
          );
        }),
      )
      .subscribe();
  }

  delete(id: number) {
    this.todoService
      .removeSingleTodo(id)
      .pipe(
        takeUntilDestroyed(this.subject$),
        tap(() => {
          const current = this.todosSubject$.value;
          this.todosSubject$.next(current.filter((t) => t.id !== id));
          this.todos.update((current) => current.filter((t) => t.id !== id));
        }),
      )
      .subscribe();
  }
}
