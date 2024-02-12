import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { Subscription, auditTime, combineLatest, startWith, tap } from 'rxjs';
import { IFilter } from '../../models';
import { LoaderService } from '../../units/loader.service';
import { TableService } from '../../units/table.service';

@Component({
  selector: 'app-table-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './table-filters.component.html',
  styleUrl: './table-filters.component.scss',
})
export class TableFiltersComponent implements OnInit, OnDestroy {
  private readonly _sub = new Subscription();

  /* PRICE CONFIG */
  public readonly priceConfig = {
    min: 1,
    max: 100,
  };

  /* FILTER CONFIG */
  private filterValues: IFilter = {
    name: '',
    domain: '',
    category: '',
    minPrice: this.priceConfig.min,
    maxPrice: this.priceConfig.max,
  };

  /* FORM CONTROLS */
  public readonly nameFilterControl = new FormControl();
  public readonly domainFilterControl = new FormControl();
  public readonly categoryFilterControl = new FormControl();
  public readonly minPriceFilterControl = new FormControl(this.priceConfig.min);
  public readonly maxPriceFilterControl = new FormControl(this.priceConfig.max);

  constructor(
    private readonly _tableService: TableService,
    private readonly _loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.listenControls();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  /* LISTENERS */
  private listenControls() {
    this._sub.add(
      combineLatest([
        this.nameFilterControl.valueChanges.pipe(startWith('')),
        this.domainFilterControl.valueChanges.pipe(startWith('')),
        this.categoryFilterControl.valueChanges.pipe(startWith('')),
        this.minPriceFilterControl.valueChanges.pipe(
          startWith(this.priceConfig.min)
        ),
        this.maxPriceFilterControl.valueChanges.pipe(
          startWith(this.priceConfig.max)
        ),
      ])
        .pipe(
          tap(() => this._loaderService.start()),
          auditTime(500)
        )
        .subscribe(([name, domain, category, minPrice, maxPrice]) => {
          this.filterValues.name = name;
          this.filterValues.domain = domain;
          this.filterValues.category = category;
          this.filterValues.minPrice = minPrice as number;
          this.filterValues.maxPrice = maxPrice as number;

          this._tableService.setFilterValue(this.filterValues);
        })
    );
  }

  /* CLEAR CONTROLS */
  public clearNameFilter() {
    this.nameFilterControl.setValue('');
  }

  public clearDomainFilter() {
    this.domainFilterControl.setValue('');
  }

  public clearCategoryFilter() {
    this.categoryFilterControl.setValue('');
  }
}
