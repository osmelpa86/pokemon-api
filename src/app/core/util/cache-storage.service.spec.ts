import { TestBed } from '@angular/core/testing';
import { CacheStorageService } from './cache-storage.service';

describe('CacheStorageService', () => {
  let service: CacheStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheStorageService);
    spyOn(window.sessionStorage, 'getItem').and.callFake((key: string) => {
      return key === 'testKey' ? JSON.stringify('testValue') : null;
    });
    spyOn(window.sessionStorage, 'setItem').and.callThrough();
    spyOn(window.sessionStorage, 'removeItem').and.callThrough();
    spyOn(window.sessionStorage, 'clear').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value from sessionStorage', () => {
    const value = service.get('testKey');
    expect(value).toBe('testValue');
  });

  it('should return null if key does not exist in sessionStorage', () => {
    const value = service.get('nonExistentKey');
    expect(value).toBeNull();
  });

  it('should set a value in sessionStorage', () => {
    const result = service.set('newKey', 'newValue');
    expect(result).toBeTrue();
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      'newKey',
      JSON.stringify('newValue')
    );
  });

  it('should emit a change event when setting a value', () => {
    let changesSpy = spyOn(service.changes$, 'next');
    service.set('newKey', 'newValue');
    expect(changesSpy).toHaveBeenCalledWith({
      type: 'set',
      key: 'newKey',
      value: 'newValue',
    });
  });

  it('should remove a value from sessionStorage', () => {
    const result = service.remove('testKey');
    expect(result).toBeTrue();
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('testKey');
  });

  it('should emit a change event when removing a value', () => {
    let changesSpy = spyOn(service.changes$, 'next');
    service.remove('testKey');
    expect(changesSpy).toHaveBeenCalledWith({
      type: 'remove',
      key: 'testKey',
    });
  });

  it('should clear all sessionStorage', () => {
    service.clear();
    expect(window.sessionStorage.clear).toHaveBeenCalled();
  });

  it('should return true for isSessionStorageSupported when sessionStorage is available', () => {
    expect(service.isSessionStorageSupported).toBeTrue();
  });

  it('should return false for isSessionStorageSupported when sessionStorage is not available', () => {
    service['sessionStorage'] = null as any;
    expect(service.isSessionStorageSupported).toBeFalse();
  });
});
