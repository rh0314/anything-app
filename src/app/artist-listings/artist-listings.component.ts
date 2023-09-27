import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';
import { SidenavService } from '../services/sidenav.service';
import { WindowRefService } from '../services/window-ref.service';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'any-artist-listings',
  templateUrl: './artist-listings.component.html',
  styleUrls: ['./artist-listings.component.scss']
})
export class ArtistListingsComponent implements OnInit {
  sidenavIsOpen: boolean;
  title = "Musical Artists";
  subtitle = "Find your favorite artist and view their discography";
  smallScreen: boolean;

  constructor(
    private sidenavService: SidenavService,
    private windowRef: WindowRefService,
    private artistService: ArtistService,
    private dialogService: DialogService
  ) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      this.sidenavIsOpen = !!data
    });
    this.sidenavIsOpen = !!this.sidenavService.openClosed;

  }


  ngOnInit() {
    
  }

  onExpansionPanelResize() {
    this.windowRef.triggerResize();
  }
  
  infoClick() {
    this.dialogService.openOverviewDialog('music-catalog');
  }
}
