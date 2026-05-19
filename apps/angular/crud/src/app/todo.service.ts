import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todosSubject$ = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this.todosSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        catchError((err) => this.throwErrorMessage(err)),
        tap((todos) => this.todosSubject$.next(todos)),
      );
  }

  updateSingleTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          id: todo.id,
          title: randText(),
          userId: todo.userId,
          completed: todo.completed,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(
        catchError((err) => this.throwErrorMessage(err)),
        tap((updatedTodo) => {
          const current = this.todosSubject$.value;
          const updated = current.map((t) =>
            t.id === updatedTodo.id ? updatedTodo : t,
          );
          this.todosSubject$.next(updated);
        }),
      );
  }

  removeSingleTodo(id: number): Observable<null> {
    return this.http
      .delete<null>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .pipe(
        catchError((err) => this.throwErrorMessage(err)),
        tap(() => {
          const current = this.todosSubject$.value;
          this.todosSubject$.next(current.filter((t) => t.id !== id));
        }),
      );
  }

  throwErrorMessage(err: any): Observable<never> {
    return throwError(() => {
      const message = new Error(err?.message || err);
      console.error(message);
      return of([]);
    });
  }
}
