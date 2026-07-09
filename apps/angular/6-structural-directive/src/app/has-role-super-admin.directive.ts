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
  selector: '[hasRoleSuperAdmin]',
  standalone: true,
})
export class HasRoleSuperAdminDirective {
  private templateRef = inject(TemplateRef<never>);
  private readonly userStore = inject(UserStore);
  private viewContainer = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);

  user$ = this.userStore.user$;
  private currentRole: any;

  constructor() {
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.updateView(user);
    });
  }

  @Input() set hasRoleSuperAdmin(role: any) {
    this.currentRole = role;

    this.userStore.user$
      .subscribe((user) => {
        this.updateView(user);
      })
      .unsubscribe();
  }

  private updateView(user: any) {
    const hasPermission =
      user?.isAdmin === this.currentRole.isAdmin &&
      user?.name === this.currentRole.name;

    this.viewContainer.clear();

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
