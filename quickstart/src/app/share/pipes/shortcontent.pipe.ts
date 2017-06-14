import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcontentpipe'
})

export class ShortContentPipe implements PipeTransform{
  transform(inputContent: string, param: number){
  	if (inputContent.length > param) {
	    return inputContent.substring(0, param) + "...";
  	} else {
  		return inputContent;
  	}
  }
}
