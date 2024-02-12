import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TableService } from '../../units/table.service';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  public readonly resultsLength = 10;
  public readonly pageSize = 10;

  constructor(private readonly _tableService: TableService) {}

  ngAfterViewInit(): void {
    this._tableService.setPaginator(this._paginator);
  }
}
