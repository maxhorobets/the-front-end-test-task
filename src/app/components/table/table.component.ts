import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ICompany } from '../../models';
import { LoaderService } from '../../units/loader.service';
import { TableService } from '../../units/table.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  public readonly displayedColumns: string[] = [
    'name',
    'domain',
    'category',
    'price',
  ];

  /* GETTERS */
  public get dataSource(): MatTableDataSource<ICompany, MatPaginator> {
    return this._tableService.dataSource;
  }

  public get isLoading$(): Observable<boolean> {
    return this._loaderService.loaderState$;
  }

  constructor(
    private readonly _tableService: TableService,
    private readonly _loaderService: LoaderService,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this._loaderService.loaderState$.subscribe(() => this._cdr.detectChanges());
  }
}
