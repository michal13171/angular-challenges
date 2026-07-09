import {
  DestroyRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStore } from './user.store';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<never>);
  private readonly userStore = inject(UserStore);
  private viewContainer = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef); // Potrzebne do czyszczenia pamięci

  user$ = this.userStore.user$;
  private currentRole: any;

  constructor() {
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.updateView(user);
    });
  }

  @Input() set hasRole(role: any) {
    this.currentRole = role;

    this.userStore.user$
      .subscribe((user) => {
        this.updateView(user);
      })
      .unsubscribe();
  }

  private updateView(user: any) {
    const hasPermission = user?.name === this.currentRole.name;

    this.viewContainer.clear();

    if (user.roles.length <= 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (hasPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }
}
