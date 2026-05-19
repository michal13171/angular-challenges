import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonPipe } from './pure.pipe';

@Component({
  standalone: true,
  imports: [NgFor, PersonPipe],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | personPipe: index }}
    </div>
  `,
})
export class AppComponent {
  persons: string[] = <string[]>['toto', 'jack'];
}
