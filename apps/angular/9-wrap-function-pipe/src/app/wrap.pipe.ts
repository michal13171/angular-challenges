import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrap',
  standalone: true,
})
export class WrapPipe implements PipeTransform {
  transform<T extends any[], Return>(
    fn: (...args: T) => Return,
    ...args: T
  ): Return {
    return fn(...args);
  }
}
