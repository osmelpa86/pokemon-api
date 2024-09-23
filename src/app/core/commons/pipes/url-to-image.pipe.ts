import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlToImage',
  standalone: true,
})
export class UrlToImagePipe implements PipeTransform {

   transform(value: string, alt: string = '', width: string = '100%', height: string = 'auto'): string {
    if (!value) {
      return '';
    }
    return `<img src="${value}" alt="${alt}" width="${width}" height="${height}"/>`;
  }

}
