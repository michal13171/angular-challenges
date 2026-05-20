import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled', // Enables scrolling to fragments (#id)
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
