import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Album, Artist } from '../artist.model';
import { MatTableDataSource } from '@angular/material/table';
import { ArtistService } from '../artist.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

export class ArtistTableDataObj {
  id: number;
  name: string;
  bio: string;
  albums: Album[];
  bioOpen: boolean;
  
  constructor(artist: Artist) {
    if (!artist) { return; }
    const keys = Object.keys(artist);
    keys.forEach(key => {
      this[key] = artist[key];
    });
  }
}



@Component({
  selector: 'any-artist-table',
  templateUrl: './artist-table.component.html',
  styleUrls: ['./artist-table.component.scss']
})

export class ArtistTableComponent implements OnInit, OnDestroy {
  killSubs = [];
  sizeOptions = [20, 50, 100, 200, 500];
  selectedSizeOption = this.sizeOptions[0];
  startingIndex = 0;
  artistTableObjects: ArtistTableDataObj[] = [];
  totalArtists: number;
  smallScreen: boolean;
  private _artists: Artist[];
  @Input() set artists(val) {
    this._artists = val;
    if (val) {
    this._artists.forEach(artist => {
      this.artistTableObjects.push(new ArtistTableDataObj(artist));
    });
  }
  }
  get artists() {
    return this._artists;
  }

  @Output() expansionPanelOpenedClosed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  displayedColumns = ['id'];
  sidenavIsOpen: boolean;


  constructor(private artistService: ArtistService, 
    private sidenavService: SidenavService, 
    private windowRef: WindowRefService,
    private localStorage: LocalStorageService
    ) {
    this.sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => {
      this.sidenavIsOpen = !!data;
    });
    this.windowRef.smallScreenWatcher.pipe(takeUntilDestroyed()).subscribe(data => this.smallScreen = data);
    this.smallScreen = this.windowRef.smallScreen;
  }


  ngOnInit() {
    const savedPageSize = this.localStorage.getData('artistTablePageSize');
    if (savedPageSize) {
      this.selectedSizeOption = Number.parseInt(savedPageSize);
    }
    this.getAPage();
  }

  pageChanged(event) {
    console.log(event);
    this.selectedSizeOption = event.pageSize;
    this.startingIndex = event.pageIndex * event.pageSize;
    this.localStorage.saveData('artistTablePageSize', this.selectedSizeOption.toString());
    this.getAPage();
  }
  
  getAPage() {
    const sub = this.artistService.getRange(this.startingIndex, this.startingIndex + this.selectedSizeOption).subscribe(data => {
      this.artists = data.currentRange;
      this.totalArtists = data.totalAvailable;
      console.log('artists', this.artists.length, this.artists);
    });
    this.killSubs.push(sub);
  }

  bioOpened(row) {
    row.bioOpen = true
    this.expansionPanelOpenedClosed.next(row.bioOpen);
  }

  bioClosed(row) {
    row.bioOpen = false;
    this.expansionPanelOpenedClosed.next(row.bioOpen);
  }

  catalogOpened(row) {
    row.catalogOpen = true
    this.expansionPanelOpenedClosed.next(row.catalogOpen);
  }

  catalogClosed(row) {
    row.catalogOpen = false;
    this.expansionPanelOpenedClosed.next(row.catalogOpen);
  }


  ngOnDestroy() {
    this.killSubs.forEach(sub => sub.unsubscribe());
  }

}
