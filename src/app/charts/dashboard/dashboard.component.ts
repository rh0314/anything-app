import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'any-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sidenavIsOpen: boolean;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      this.sidenavIsOpen = !!data;
    });
  }
}
