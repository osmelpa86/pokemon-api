import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of the word "capitalize"', () => {
    const result = pipe.transform('capitalize');
    expect(result).toBe('Capitalize');
  });

  it('should not change the string if the first letter is already capitalized', () => {
    const result = pipe.transform('Capitalize');
    expect(result).toBe('Capitalize');
  });

  it('should return the original string if it does not need capitalization', () => {
    const result = pipe.transform('incorrect');
    expect(result).toBe('Incorrect');
  });

  it('should handle an empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle null or undefined input', () => {
    expect(pipe.transform(null as any)).toBeNull();
    expect(pipe.transform(undefined as any)).toBeUndefined();
  });
});
