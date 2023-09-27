import { Component, Input } from '@angular/core';
import { Artist } from '../artist.model';

@Component({
  selector: 'any-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent {
  @Input() artist: Artist;



  constructor() {

  }
}
