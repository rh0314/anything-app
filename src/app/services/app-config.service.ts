import { Injectable } from '@angular/core';
import { config } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private _appConfig
  get appConfig() {
    return this._appConfig;
  }
  set appConfig(val) {
    this._appConfig = val;
  }

  constructor(private http: HttpClient) { 
    this.appConfig = config;
  }

  isAuthorized() {
    return this.http.get('/api/isauthorized');
  }

}
