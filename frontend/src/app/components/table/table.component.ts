import {Component, input} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {TitleCasePipe} from '@angular/common';
import {CamelCaseToWordsPipe} from '../../pipes/camel-case-to-words.pipe';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    CamelCaseToWordsPipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {
  displayedColumns = input.required<string[]>();
  dataSource = input.required<T[]>();
}
