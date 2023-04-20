import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/common';
import { ProductsService } from '../services/products.service';
import { FilterFacade } from '../store/facades/filters.facades';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent implements OnInit {
  products$ = this.filterFacade.products.data$;
  constructor(
    private filterFacade: FilterFacade,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.navigationService.setPageTitle('home');
    this.filterFacade.fetchProducts();
  }
}
