import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { take, timer } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <mat-progress-spinner
      mode="indeterminate"
      value="100"
      *ngIf="loading"></mat-progress-spinner>
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
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
  todos!: Todo[];
  loading: boolean = true;

  constructor(private todoService: TodoService) {}

  endLoader(): void {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => (this.loading = false));
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.loading = true;
        this.todos = todos;
      },
      complete: () => this.endLoader(),
    });
  }

  update(todo: Todo) {
    this.todoService.updateSingleTodo(todo).subscribe({
      complete: () => this.endLoader(),
      next: (todoUpdated: Todo) => {
        this.loading = true;
        this.todos[todoUpdated.id - 1] = todoUpdated;
      },
    });
  }

  delete(id: number) {
    this.todoService.removeSingleTodo(id).subscribe({
      next: () => (this.loading = true),
      complete: () => this.endLoader(),
    });
  }
}
