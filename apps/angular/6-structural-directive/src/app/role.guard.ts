import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const roleGuard: CanMatchFn = (route) => {
  const store = inject(UserStore);

  const allowedRoles = route.data?.['roles'] as Role[];

  if (!allowedRoles) {
    return true;
  }

  return store.user$.pipe(
    map((user) => {
      return allowedRoles.includes(user.name as Role);
    }),
  );
};
