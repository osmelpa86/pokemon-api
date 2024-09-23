import { TestBed } from '@angular/core/testing';
import { TokenStorageService } from './token-storage.service';
import { CacheStorageService } from './cache-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;
  let cacheStorageService: jasmine.SpyObj<CacheStorageService>;

  beforeEach(() => {
    const cacheStorageServiceSpy = jasmine.createSpyObj('CacheStorageService', [
      'get',
      'set',
      'remove',
      'clear',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TokenStorageService,
        { provide: CacheStorageService, useValue: cacheStorageServiceSpy },
      ],
    });

    service = TestBed.inject(TokenStorageService);
    cacheStorageService = TestBed.inject(
      CacheStorageService
    ) as jasmine.SpyObj<CacheStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear the cache on signOut', () => {
    service.signOut();
    expect(cacheStorageService.clear).toHaveBeenCalled();
  });

  it('should save the token', () => {
    const token = 'test-token';
    service.saveToken(token);
    expect(cacheStorageService.remove).toHaveBeenCalledWith('AuthToken');
    expect(cacheStorageService.set).toHaveBeenCalledWith('AuthToken', token);
  });

  it('should return the token', () => {
    const token = 'test-token';
    cacheStorageService.get.and.returnValue(token);
    expect(service.getToken()).toBe(token);
  });

  it('should save the user', () => {
    const user = 'test-user';
    service.saveUser(user);
    expect(cacheStorageService.remove).toHaveBeenCalledWith('AuthUserId');
    expect(cacheStorageService.set).toHaveBeenCalledWith('AuthUserId', user);
  });

  it('should return the user', () => {
    const user = 'test-user';
    cacheStorageService.get.and.returnValue(user);
    expect(service.getUser()).toBe(user);
  });
});
