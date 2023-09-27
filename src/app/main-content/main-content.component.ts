import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav.service';
import { SidenavOpenClosedStatusEnum } from '../models/sidenav-status.model';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { WindowRefService } from '../services/window-ref.service';
import { ScreenData } from '../models/window-data.model';

@Component({
  selector: 'any-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent  {
}
