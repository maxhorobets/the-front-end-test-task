import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TableFiltersComponent } from './components/table-filters/table-filters.component';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TableFiltersComponent,
    TableComponent,
    PaginatorComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
