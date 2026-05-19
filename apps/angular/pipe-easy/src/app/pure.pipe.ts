import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personPipe',
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(value: string, args: number): string {
    return `${<string>value} - ${<number>args}`;
  }
}
