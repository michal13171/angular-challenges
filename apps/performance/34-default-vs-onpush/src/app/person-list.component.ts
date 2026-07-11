import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AddOneMemberComponent } from './add-one-member.component';
import { ListingMemberComponent } from './listing-member.component';

@Component({
  selector: 'app-person-list',
  imports: [
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    CDFlashingDirective,
    TitleCasePipe,
    AddOneMemberComponent,
    ListingMemberComponent,
  ],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <app-add-one-member [names]="names"></app-add-one-member>

    <mat-list class="flex w-full">
      @if (names().length === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (name of names(); track name) {
        <app-listing-member>
          <h3 title="Name">
            {{ name }}
          </h3>
        </app-listing-member>
      }
      @if (names().length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  names = input<string[]>([]);
  title = input('');
}
