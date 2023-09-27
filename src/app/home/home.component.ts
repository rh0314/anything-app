import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidenavService } from '../services/sidenav.service';
import { WindowRefService } from '../services/window-ref.service';

@Component({
  selector: 'any-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  sidenavIsOpen: boolean;
  constructor(private sidenavService: SidenavService, private el: ElementRef, private rend: Renderer2, private windowRef: WindowRefService) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => this.sidenavIsOpen = !!data);
    this.windowRef.title = 'home';    
  }

  ngAfterViewInit() {
    this.sidenavService.openSidenav();
    const div = this.el.nativeElement.children[0];
    let b = div.getBoundingClientRect();
  }
}
