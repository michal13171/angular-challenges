import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    <app-card>
      <div card-title>Titre 1</div>
      <div card-message>Message1</div>
    </app-card>
    <app-card>
      <div card-title>Titre 1</div>
      <div card-message>Aucun message</div>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {}
