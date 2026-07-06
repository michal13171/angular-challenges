import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  imports: [PlaceholderComponent, TopComponent],
  standalone: true,
  template: `
    <div class="h-screen bg-gray-500">
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        #loadBtn>
        Load Top
      </button>
      @defer (on interaction(loadBtn); prefetch on hover(loadBtn)) {
        <app-top></app-top>
      } @placeholder {
        <app-placeholder />
      } @error {
        <!-- Fallback safe UI state if the network disconnects or the chunk fails to load -->
        <p style="color: red;">
          Failed to load the component. Please check your connection.
        </p>
      }
    </div>
  `,
})
export class AppComponent {}
