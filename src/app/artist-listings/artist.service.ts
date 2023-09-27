import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, of, tap } from 'rxjs';
import { config } from '../../environments/environment';
import { Artist } from './artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  urlPrefix = '';
  artistCache: Artist[] = [];

  constructor(private http: HttpClient) {
    if (config.apiServer) {
      this.urlPrefix += `${config.apiProtocol ? config.apiProtocol : 'http'}://${config.apiServer ? config.apiServer : 'localhost'}${config.apiPort ? ':' + config.apiPort : ':2999'}`;
    }
    this.urlPrefix += config.apiPath ? config.apiPath : '';

   }

  getArtists(): Observable<Artist[]> {
    if (!(this.artistCache && this.artistCache.length)) {
      return this.http.get<Artist[]>(`${this.urlPrefix}/artists`).pipe(tap(a => this.artistCache = a));
    }
    else {
      return of(this.artistCache);
    }
  }

  getRange(start: number, end: number, sort: string = 'name', sortDirection: number = 1): Observable<{currentRange: Artist[], totalAvailable: number}> {
      return this.http.get<{ currentRange: Artist[], totalAvailable: number}>(`${this.urlPrefix}/artists/range?start=${start}&end=${end}&sort=${sort}&sortDirection=${sortDirection}`);
  }

}
