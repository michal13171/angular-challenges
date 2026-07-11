import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  InputSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-one-member',
  imports: [MatFormField, MatInput, FormsModule, CDFlashingDirective],
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AddOneMemberComponent {
  label = '';
  @Input() names!: InputSignal<string[]>;

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.names()?.unshift(this.label);
      this.label = '';
    }
  }
}
