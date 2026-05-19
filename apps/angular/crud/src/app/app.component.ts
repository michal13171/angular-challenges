import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  Observable,
  Subject,
  finalize,
  retry,
  takeUntil,
  throttleTime,
} from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @defer (when loading) {
      @for (todo of todos$ | async; track $index) {
        <div>
          {{ todo.title }} |
          <button (click)="update(todo)">Update</button>
          |
          <button (click)="delete(todo.id)">Delete</button>
        </div>
      }
    } @loading (minimum 3000) {
      <mat-progress-spinner
        mode="indeterminate"
        value="100"></mat-progress-spinner>
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
export class AppComponent implements OnInit, OnDestroy {
  loading = signal(true);
  todoSubject$: Subject<Todo[]> = new Subject();
  todos$: Observable<Todo[]> = this.todoService.todos$;

  constructor(private todoService: TodoService) {}

  endLoader(): void {
    this.loading.set(false);
  }

  ngOnInit(): void {
    this.todoService
      .getAllTodos()
      .pipe(
        takeUntil(this.todoSubject$),
        retry(2),
        finalize(() => this.endLoader()),
      )
      .subscribe();
  }

  update(todo: Todo) {
    this.todoService
      .updateSingleTodo(todo)
      .pipe(throttleTime(500), retry(2), takeUntil(this.todoSubject$))
      .subscribe();
  }

  delete(id: number) {
    this.todoService
      .removeSingleTodo(id)
      .pipe(takeUntil(this.todoSubject$), throttleTime(500))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.todoSubject$.next([]);
    this.todoSubject$.complete();
  }
}
