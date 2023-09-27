import { Directive, ElementRef, Renderer2, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableSortComponent } from './table-sort/table-sort.component';

@Directive({
  selector: '[anyPaginatorSort]'
})
export class PaginatorSortDirective implements AfterViewInit {
  sort: string;

  @Output() sortChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private rend: Renderer2,
    private el: ElementRef,

    ) {


     }


     ngAfterViewInit() {
       const tableSort = this.rend.createElement('any-table-sort');
       let paginatorChild = this.el.nativeElement.children && this.el.nativeElement.children.length ? this.el.nativeElement.children[0] : null;
       let childCount = 1
       let parent;
       while (paginatorChild && childCount < 3) {
        paginatorChild = paginatorChild.children[0] || null;
        if (paginatorChild) { childCount++; }
        if (childCount === 2) {
          parent = paginatorChild;
        }
       }
       if (paginatorChild) {
         this.rend.insertBefore(parent, tableSort, paginatorChild);
       }
       else {
         this.rend.appendChild(this.el.nativeElement, paginatorChild);
       }

      
     }


}
