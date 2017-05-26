import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarpipe'
})

export class AvatarPipe implements PipeTransform{
  transform(inputAvatar: string){
  	let apiURL: string = 'http://172.17.19.122:3000';
    if (inputAvatar === '') {
      return apiURL + '/uploads/avatar/default-avatar.png';
    }else{
      return apiURL + inputAvatar;
    }
  }
}
