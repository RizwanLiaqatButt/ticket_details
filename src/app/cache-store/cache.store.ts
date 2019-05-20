import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CacheInfo } from './cache.info';
import 'rxjs/add/operator/share';

export class CacheStore {
  public static get(key: string): any {
    const item: any = localStorage.getItem(key);
    if (item != null) {
      return (JSON.parse(item).Data);
    }
    return (null);
  }

  public static set(key: string, value: any) {
    const item = new CacheInfo();
    item.Key = key;
    item.Data = value;
    item.ModifiedTime = new Date();
    localStorage.setItem(key, JSON.stringify(item));
  }

  public static remove(key: string) {
    localStorage.removeItem(key);
  }
}
