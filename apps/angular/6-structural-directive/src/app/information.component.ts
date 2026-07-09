import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleSuperAdminDirective } from './has-role-super-admin.directive';
import { HasRoleDirective } from './has-role.directive';
import { admin, client, everyone, manager, reader, writer } from './user.model';

@Component({
  selector: 'app-information',
  imports: [CommonModule, HasRoleSuperAdminDirective, HasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRoleSuperAdmin="admin">visible only for super admin</div>
    <div *hasRole="manager">visible if manager</div>
    <div *hasRole="reader">visible if manager and/or reader</div>
    <div *hasRole="writer">visible if manager and/or writer</div>
    <div *hasRole="client">visible if client</div>
    <div *hasRole="everyone">visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InformationComponent {
  protected readonly manager = manager;
  protected readonly reader = reader;
  protected readonly writer = writer;
  protected readonly client = client;
  protected readonly everyone = everyone;
  protected readonly admin = admin;
}
