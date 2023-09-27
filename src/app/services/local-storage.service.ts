import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public getAll() {
    let items = [];
    for (let i = 0; i < localStorage.length; i++) {
      let item = {
        key: localStorage.key(i),
        value: null
      }
      item.value = localStorage.getItem(item.key);
      items.push(item);
    }

    return items;
  }

  
}