import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fibonacciComputation',
  standalone: true,
})
export class FibonacciComputationPipe implements PipeTransform {
  fibonacci = (num: number): number => {
    if (num === 1 || num === 2) {
      return 1;
    }
    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  };

  transform(num: number): number {
    return this.fibonacci(num);
  }
}
