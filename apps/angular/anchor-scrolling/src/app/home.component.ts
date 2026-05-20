import { Component, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink, RouterLinkActive],
  selector: 'app-home',
  template: `
    <nav-button [links]="'/foo'" class="fixed left-1/2 top-3">
      Foo Page
    </nav-button>
    <div id="top" class="h-screen snap-start bg-gray-500">
      Empty
      <nav-button [links]="homePath" [fragment]="'bottom'">
        Scroll Bottom
      </nav-button>
    </div>
    <div id="bottom" class="h-screen snap-start bg-blue-300">
      I want to scroll each
      <nav-button [links]="homePath" [fragment]="'top'">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {
  @Output() links = '.';
  @Output() fragment = '';
  homePath = '.';
}
