import { TestBed } from '@angular/core/testing';
import { LinkPipe } from './link.pipe';

describe('LinkPipe', () => {
  let pipe: LinkPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkPipe],
    });
    pipe = TestBed.inject(LinkPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a URL into an HTML link', () => {
    const url = 'https://example.com';
    const result = pipe.transform(url);
    const expected = `
    <a mat-button matRipple href="${url}" target="_blank" class="cell-link-button">
        <span class="material-icons">link</span>
        <span>Ver Pokemon</span>
    </a>
    `;
    expect(result.trim()).toEqual(expected.trim());
  });

  it('should return an empty string if no URL is provided', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should return an empty string if URL is null', () => {
    const result = pipe.transform(null as unknown as string);
    expect(result).toBe('');
  });
});
