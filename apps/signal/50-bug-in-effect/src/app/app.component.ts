import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input
          type="checkbox"
          [(ngModel)]="drive"
          (ngModelChange)="drive.set($event)" />
        +500 GB drive-space
      </div>
      <div>
        <input
          type="checkbox"
          [(ngModel)]="ram"
          (ngModelChange)="ram.set($event)" />
        +4 GB RAM
      </div>
      <div>
        <input
          type="checkbox"
          [(ngModel)]="gpu"
          (ngModelChange)="gpu.set($event)" />
        Better GPU
      </div>
    </section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = signal(false);
  ram = signal(false);
  gpu = signal(false);

  private prevDrive = false;
  private prevRam = false;
  private prevGpu = false;

  currentSignalsIsCheckedShowAlert() {
    const drive = this.drive();
    const ram = this.ram();
    const gpu = this.gpu();

    let shouldAlert = false;

    if (drive && !this.prevDrive) shouldAlert = true;
    if (ram && !this.prevRam) shouldAlert = true;
    if (gpu && !this.prevGpu) shouldAlert = true;

    this.prevDrive = drive;
    this.prevRam = ram;
    this.prevGpu = gpu;

    if (shouldAlert) {
      alert('Price increased!');
    }
  }

  constructor() {
    effect(
      () => {
        this.currentSignalsIsCheckedShowAlert();
      },
      {
        manualCleanup: true,
      },
    ).destroy();
  }
}
