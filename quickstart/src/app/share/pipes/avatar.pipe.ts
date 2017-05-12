import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarpipe'
})

export class AvatarPipe implements PipeTransform{
  transform(inputAvatar: string){
    if (inputAvatar === '') {
      return 'https://www.drupal.org/files/issues/default-avatar.png';
    }else{
      return inputAvatar;
    }
  }
}
