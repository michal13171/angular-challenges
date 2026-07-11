import { Component } from '@angular/core';
import { WrapPipe } from './wrap.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    @for (person of persons; track person.name) {
      {{ showName | wrap: person.name : $index }}
      {{ isAllowed | wrap: person.age : $first }}
    }
  `,
  imports: [WrapPipe],
})
export class AppComponent {
  persons: [
    { name: string; age: number },
    { name: string; age: number },
    { name: string; age: number },
  ] = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(name: string, index: number | boolean): string {
    // very heavy computation
    return `${name} - ${index}` as const;
  }

  isAllowed(age: number, isFirst: boolean): string {
    if (isFirst) {
      return 'always allowed' as const;
    } else {
      return age > 25 ? 'allowed' : ('declined' as const);
    }
  }
}
