import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'any-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  backgroundImageStyle: string = '';
  flipped = false;
  @Input() album: any;


  constructor(private rend: Renderer2, private el: ElementRef) {
    if (this.album) {
      this.backgroundImageStyle = `url('${this.album.url}')`;

    }
  }

  showReview() {
    this.flipped = !this.flipped;
    if (this.flipped) {
      this.rend.addClass(this.el.nativeElement, 'show-review');
    }
    else {
      this.rend.removeClass(this.el.nativeElement, 'show-review');
    }
  }
}
