import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, filter, map, of, take } from 'rxjs';
import { Overview } from '../models/overview.model';
import { config } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  server = config.apiServer;
  protocol = config.apiProtocol;

  urlPrefix: string = '';

  constructor(private http: HttpClient) {
    if (this.server) {
      this.urlPrefix += `${this.protocol ? this.protocol : 'http'}://${this.server ? this.server : 'localhost'}${config.apiPort ? ':' + config.apiPort : ':3000'}`;
    }
    this.urlPrefix += config.apiPath ? config.apiPath : '';
    // console.log('urlPrefix', this.urlPrefix);
  }

  getOverviewByKey(key: string): Observable<Overview> {
    if (!key) { return null; }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get(`${this.urlPrefix}/descriptions`, { headers: headers }).pipe(
      map((data: Map<string, Overview>) => {
        const keys = Object.keys(data);
        if (keys) {
          return data[key];
        }
        else {
          return null;
        }
      })
    );
  }

}
