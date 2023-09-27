import { Component, Input, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OverviewService } from './overview.service';
import { Overview } from '../models/overview.model';
import { Observable, map } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WindowRefService } from '../services/window-ref.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-overview-dialog',
  templateUrl: './overview-dialog.component.html',
  styleUrls: ['./overview-dialog.component.scss']
})
export class OverviewDialogComponent implements OnInit {
  pageId: string;
  overview$: Observable<Overview> = new Observable<Overview>();
  smallScreen: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private overviewService: OverviewService,
    private dialogRef: MatDialogRef<OverviewDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
    private windowRef: WindowRefService
  ) {
    this.pageId = data.pageId
  }

  ngOnInit() {
    if (this.pageId) {
      this.overview$ = this.overviewService.getOverviewByKey(this.pageId).pipe(map(x => {
        if (!x) { return null; }
        x.safeDescription = x && x.description ? this.sanitizer.bypassSecurityTrustHtml(x.description) : '';
        return x;
      }));
    }
  }

  close() {
    this.dialogRef.close();
  }


}
