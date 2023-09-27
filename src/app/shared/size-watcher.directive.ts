import { ViewportRuler } from '@angular/cdk/scrolling';
import { Directive, OnDestroy, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[anySizeWatcher]'
})
export class SizeWatcherDirective implements AfterViewInit, OnDestroy {

  @Input() bottomMargin: number = 0;

  width: number;
  height: number;

  private readonly viewportChange = this.viewportRuler.change().subscribe(() => setTimeout(() => { this.onResize() }, 250))

  constructor(private readonly viewportRuler: ViewportRuler, private el: ElementRef, private rend: Renderer2) { }

  ngAfterViewInit() {
    setTimeout(() => { this.onResize() }, 500);
  }

  onResize() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.rend.removeStyle(this.el.nativeElement, 'height');
    this.rend.removeStyle(this.el.nativeElement, 'max-height');

    const windowRect = this.viewportRuler.getViewportRect();
    const windowHeight = windowRect.height;
    const windowBottom = windowRect.bottom;

    const nodeBottom = rect.bottom;
    const nodeHeight = rect.height;
    const nodeTop = rect.top;
    
    if (nodeHeight > windowHeight - nodeTop) {
      let newHeight = windowHeight - (nodeTop + this.bottomMargin);

      this.rend.setStyle(this.el.nativeElement, 'height', newHeight + 'px');
      this.rend.setStyle(this.el.nativeElement, 'max-height', newHeight + 'px');
      this.rend.setStyle(this.el.nativeElement, 'overflow-y', 'auto');
    }
  }

  ngOnDestroy() {
    this.viewportChange.unsubscribe();
  }

}
