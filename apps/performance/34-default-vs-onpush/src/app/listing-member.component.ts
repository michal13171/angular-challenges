import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-listing-member',
  imports: [MatListItem, CDFlashingDirective],
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div class="flex justify-between">
        <ng-content></ng-content>
      </div>
    </mat-list-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ListingMemberComponent {}
