import { Component } from '@angular/core';

@Component({
  selector: 'any-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss']
})
export class TableSortComponent {
  options = [
    'name',
    'album count'
  ]
  selectedOption: string = this.options[0] || ''; 
}
