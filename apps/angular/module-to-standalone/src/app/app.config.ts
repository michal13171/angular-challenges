import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AppComponent, // another cmp for home
      },
      {
        path: 'admin',
        component: AppComponent, // another cmp for admin
      },
      {
        path: 'user',
        component: AppComponent, // another cmp for user
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
};
