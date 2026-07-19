import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

type Difficulty = 'EASY' | 'NORMAL';

type Direction<T extends string> = { [K in T]: K };
type DirectionType = 'LEFT' | 'RIGHT';

@Component({
  imports: [MatButton],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set('EASY')">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set('NORMAL')">
          Normal
        </button>
      </div>
      <p>Selected Difficulty: {{ difficultyLabel() }}</p>
    </section>

    <section>
      <div>
        <button mat-stroked-button (click)="direction.set('LEFT')">Left</button>
        <button mat-stroked-button (click)="direction.set('RIGHT')">
          Right
        </button>
      </div>
      <p>{{ directionLabel() }}</p>
    </section>
  `,
  styles: `
    @reference "tailwindcss";

    section {
      @apply mx-auto my-5 flex w-fit flex-col items-center gap-2;

      > div {
        @apply flex w-fit gap-5;
      }
    }

    button {
      @apply rounded-md border px-4 py-2;
    }
  `,
  standalone: true,
})
export class AppComponent {
  readonly Difficulty: Difficulty = 'EASY';

  readonly difficulty = signal<Difficulty>(this.Difficulty);

  readonly Direction: Direction<string> = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
  } satisfies Direction<'LEFT' | 'RIGHT'>;
  readonly direction = signal<DirectionType | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case 'EASY':
        return 'Easy';
      case 'NORMAL':
        return 'Normal';
    }
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';

    switch (this.direction()) {
      case 'LEFT':
        return `${prefix} LEFT}`;
      case 'RIGHT':
        return `${prefix} RIGHT}`;
      default:
        return 'Choose a direction!';
    }
  });
}
