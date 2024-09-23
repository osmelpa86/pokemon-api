import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'link',
  standalone: true,
})
export class LinkPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    return `
    <a mat-button matRipple href="${value}" target="_blank" class="cell-link-button">
        <span class="material-icons">link</span>
        <span>Ver Pokemon</span>
    </a>
    `;
  }
}
