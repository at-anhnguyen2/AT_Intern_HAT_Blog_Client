import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../../share/app.config';

@Pipe({
  name: 'imagepipe'
})

export class ImagePipe implements PipeTransform{
  constructor(private _appConfig: AppConfig) {}
  transform(inputImage: string){
  	let apiURL: string = this._appConfig.serverUrl;
    // if (inputAvatar === '') {
    //   return apiURL + '/uploads/avatar/default-avatar.png';
    // }else{
      return apiURL + inputImage;
    // }
  }
}
