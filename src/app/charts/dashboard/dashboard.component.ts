import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from 'src/app/services/dialog.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'any-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sidenavIsOpen: boolean;
  dashboardData = {};

  constructor(
    private sidenavService: SidenavService,
    private dialogService: DialogService
    ) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      this.sidenavIsOpen = !!data;
    });
  }

  infoClick() {
    this.dialogService.openOverviewDialog('charts');
  }
}
