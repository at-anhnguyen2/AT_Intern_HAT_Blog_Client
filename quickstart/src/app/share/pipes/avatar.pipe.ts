import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../../share/app.config';

@Pipe({
  name: 'avatarpipe'
})

export class AvatarPipe implements PipeTransform{
	constructor(private _appConfig: AppConfig) {}
  transform(inputAvatar: string){
  	let apiURL: string = this._appConfig.serverUrl;
    if (inputAvatar === '' || inputAvatar === null) {
      return apiURL + '/uploads/avatar/default-avatar.png';
    }else{
      return apiURL + inputAvatar;
    }
  }
}
