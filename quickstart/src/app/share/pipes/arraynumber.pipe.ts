import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraynumber'
})

export class ArrayNumberPipe implements PipeTransform{
  transform(value: number){
    let arrayResult = [];
    for (var i = 0; i < value; i++) {
      arrayResult.push(i+1);
    }
    return arrayResult;
  }
}
