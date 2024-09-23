import { Injectable, inject } from '@angular/core';
import { CacheStorageService } from './cache-storage.service';

const TOKEN_KEY = 'AuthToken';
const USERID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private cacheStorageService = inject(CacheStorageService);

  constructor() {}

  signOut() {
    this.cacheStorageService.clear();
  }

  public saveToken(token: string) {
    this.cacheStorageService.remove(TOKEN_KEY);
    this.cacheStorageService.set(TOKEN_KEY, token);
  }

  public getToken(): string {
    return this.cacheStorageService.get(TOKEN_KEY);
  }

  public saveUser(user: string) {
    this.cacheStorageService.remove(USERID_KEY);
    this.cacheStorageService.set(USERID_KEY, user);
  }

  public getUser(): string {
    return this.cacheStorageService.get(USERID_KEY);
  }
}
