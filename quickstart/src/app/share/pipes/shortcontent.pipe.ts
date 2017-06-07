import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcontentpipe'
})

export class ShortContentPipe implements PipeTransform{
  transform(inputContent: string){
  	if (inputContent.length > 50) {
	    return inputContent.substring(0, 50) + "...";
  	} else {
  		return inputContent;
  	}
  }
}
