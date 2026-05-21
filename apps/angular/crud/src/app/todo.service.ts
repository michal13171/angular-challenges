import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable, catchError, throwError } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(catchError((err) => this.throwErrorMessage(err)));
  }

  updateSingleTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          id: todo.id,
          title: randText(),
          userId: todo.userId,
          completed: todo.completed,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(catchError((err) => this.throwErrorMessage(err)));
  }

  removeSingleTodo(id: number): Observable<null> {
    return this.http
      .delete<null>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .pipe(catchError((err) => this.throwErrorMessage(err)));
  }

  throwErrorMessage(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(err?.message || 'Server error'));
  }
}
