import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { COMPANY_DATA } from '../const';
import { ICompany, IFilter } from '../models';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private readonly _dataSource = new MatTableDataSource(COMPANY_DATA);

  /* GETTERS */
  public get dataSource(): MatTableDataSource<ICompany> {
    return this._dataSource;
  }

  constructor(private readonly _loaderService: LoaderService) {
    this.setFilterFunction();
  }

  private setFilterFunction() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const resultValue =
        data.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.name?.toLowerCase()) !== -1 &&
        data.domain
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.domain?.toLowerCase()) !== -1 &&
        data.category
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.category?.toLowerCase()) !== -1 &&
        data.price >= searchString.minPrice &&
        data.price <= searchString.maxPrice;

      return resultValue;
    };
  }

  public setFilterValue(filterValues: IFilter) {
    this._dataSource.filter = JSON.stringify(filterValues);
    this._loaderService.complete();
  }

  public setPaginator(paginator: MatPaginator) {
    this._dataSource.paginator = paginator;
  }
}
