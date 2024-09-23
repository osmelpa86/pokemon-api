import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CacheStorageService {

  sessionStorage: Storage;
  changes$ = new Subject();
  constructor() {
    this.sessionStorage = window.sessionStorage;
  }

  get(key: string): any {
    if (this.isSessionStorageSupported) {
      return JSON.parse(this.sessionStorage.getItem(key)!);
    }
    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isSessionStorageSupported) {
      this.sessionStorage.setItem(key, JSON.stringify(value));
      this.changes$.next({
        type: 'set',
        key,
        value
      });
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isSessionStorageSupported) {
      this.sessionStorage.removeItem(key);
      this.changes$.next({
        type: 'remove',
        key
      });
      return true;
    }
    return false;
  }

  get isSessionStorageSupported(): boolean {
    return !!this.sessionStorage
  }

  clear() {
    this.sessionStorage.clear()
  }
}
