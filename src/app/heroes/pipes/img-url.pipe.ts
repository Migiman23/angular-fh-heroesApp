import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imgURL'
})
export class ImgURLPipe implements PipeTransform {

  transform(heroe: Heroe, img: string = ''): string {
    if(!heroe.id && !heroe.alt_img) {
      return `assets/no-image.png`
    }else if(heroe.alt_img){
      return heroe.alt_img
    }

    return `assets/heroes/${heroe.id}.jpg`
  }

}
