import { AfterViewInit, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { AVContentItem } from 'src/app/models/av-content-item.model';
import { ImageDataService } from 'src/app/services/image-data.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ImageBoard } from 'src/app/models/image-board.model';
import { SidenavService } from 'src/app/services/sidenav.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'any-image-board',
  templateUrl: './image-board.component.html',
  styleUrls: ['./image-board.component.scss'],
})
export class ImageBoardComponent implements AfterViewInit {
  images: AVContentItem[] = [];
  images$: Observable<AVContentItem[]> = new Observable<AVContentItem[]>();

  @Input('contentKey') key: string;
  imageBoard: ImageBoard;
  sidenavIsOpen: boolean;
  around = false;

  constructor(
    private imageDataService: ImageDataService,
    private route: ActivatedRoute,
    private router: Router,
    private sidenavService: SidenavService,
    private dialogService: DialogService
  ) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).pipe(takeUntilDestroyed()).subscribe(event => {
      // console.log('event', event);
    });

    sidenavService.sidenavOpenClosedUpdater.pipe(takeUntilDestroyed()).subscribe(data => this.sidenavIsOpen = !!data);
  }

  ngAfterViewInit() {
      this.getImageBoardData();
      this.populateImages();
      this.around = this.images.length < 4;
  }


  async getImageBoardData() {
    const imageBoardInfo$ = this.imageDataService.getImageBoardInfo(this.key);

    if (imageBoardInfo$) {
      this.imageBoard = await firstValueFrom(imageBoardInfo$);
    }
  }

  populateImages() {
    this.images$ = this.imageDataService.getAllSets().pipe(
      map((data): AVContentItem[] => {
        const keys = Object.keys(data);
        if (keys.indexOf(this.key) > -1) {
          return data[this.key];
        }
        else {
          return null;
        }
      })
    );
  }

  infoClick() {
    this.dialogService.openOverviewDialog('tabs');
  }
}
