import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../environments/environment';
import { Letter } from './letter.model';
import { map, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  urlPrefix: string = '';
  constructor(
    private http: HttpClient,

  ) {
    if (config.apiServer || config.apiPort) {
      this.urlPrefix += `${config.apiProtocol ? config.apiProtocol : 'http'}://${config.apiServer ? config.apiServer : 'localhost'}${config.apiPort ? ':' + config.apiPort : ':2999'}`;
    }
    this.urlPrefix += config.apiPath ? config.apiPath : '';

   }


  sendLetter(letter: Letter) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(`${this.urlPrefix}/sendLetter`, letter, { headers: headers });
  }

  getLastLetter() {
    return this.http.get(`${this.urlPrefix}/lastLetter`, { headers: this.headers });
  }

  getLetters() {
    return this.http.get(`${this.urlPrefix}/letters`, { headers: this.headers });
  }


}
