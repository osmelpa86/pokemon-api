import { UrlToImagePipe } from './url-to-image.pipe';

describe('UrlToImagePipe', () => {
  let pipe: UrlToImagePipe;

  beforeEach(() => {
    pipe = new UrlToImagePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a URL into an image tag with default attributes', () => {
    const url = 'http://example.com/image.jpg';
    const result = pipe.transform(url);
    expect(result).toBe(
      '<img src="http://example.com/image.jpg" alt="" width="100%" height="auto"/>'
    );
  });

  it('should transform a URL into an image tag with custom alt, width, and height attributes', () => {
    const url = 'http://example.com/image.jpg';
    const alt = 'Example Image';
    const width = '200px';
    const height = '150px';
    const result = pipe.transform(url, alt, width, height);
    expect(result).toBe(
      '<img src="http://example.com/image.jpg" alt="Example Image" width="200px" height="150px"/>'
    );
  });

  it('should return an empty string if the URL is not provided', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });
});
