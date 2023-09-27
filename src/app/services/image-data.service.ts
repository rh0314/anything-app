import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../environments/environment';
import { Observable, filter, map, of, take } from 'rxjs';
import { ImageBoard } from '../models/image-board.model';
import { AVContentItem } from '../models/av-content-item.model';

@Injectable({
  providedIn: 'root',
})
export class ImageDataService {
  server: string = config.apiServer;
  protocol: string = config.apiProtocol;
  urlPrefix: string = '';

  constructor(private http: HttpClient) {
    if (this.server) {
      this.urlPrefix += `${this.protocol ? this.protocol : 'http'}://${this.server ? this.server : 'localhost'}${config.apiPort ? ':' + config.apiPort : ':2999'}`;
    }
    this.urlPrefix += config.apiPath ? config.apiPath : '';
  }

  getAllSets(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get(`${this.urlPrefix}/content`, { headers: headers });
  }

  getMediaSetByType(type: string): Observable<AVContentItem[]> {
    if (!type) { return of([]); }
    let returnItems = [];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get(`${this.urlPrefix}/content`, { headers: headers }).pipe(
      map((data): AVContentItem[] => {
        const keys = Object.keys(data);

        keys.forEach(key => {
          returnItems.push(...data[key].filter(x => x.type === type));
        });

        return returnItems;
      })
    );
  }
  
  getMediaSetByGroup(group: string): Observable<AVContentItem[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      return this.http.get(`${this.urlPrefix}/content`, { headers: headers }).pipe(
      map((data): AVContentItem[] => {
        const keys = Object.keys(data);
        if (keys.indexOf(group) > -1) {
          return data[group];
        }
        else {
          return null;
        }
      })
    );
  }

  getImageBoardInfo(key: string): Observable<ImageBoard> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get(`${this.urlPrefix}/imageboards`).pipe(map((x: ImageBoard[])=> {
      const iba = x.filter(q => q.key === key);
      if (iba && iba.length) { return iba[0]; }
      return null;
    }));
  }
}
