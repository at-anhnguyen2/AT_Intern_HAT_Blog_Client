import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcontentpipe'
})

export class ShortContentPipe implements PipeTransform{
  transform(inputContent: string){
  	if (inputContent.length > 30) {
	    return inputContent.substring(0, 30) + "...";
  	} else {
  		return inputContent;
  	}
  }
}
