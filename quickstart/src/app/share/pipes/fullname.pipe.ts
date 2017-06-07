import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullnamepipe'
})

export class FullNamePipe implements PipeTransform{
  transform(inputFullName: string){
    var str = inputFullName.split(" ");
    var strResult = str[str.length - 1] + " " + str[0];
    for (var i = 1, len = str.length; i < len - 1; i++) {
      strResult += " " + str[i].charAt(0) + ".";
    }
    return strResult;
  }
}
