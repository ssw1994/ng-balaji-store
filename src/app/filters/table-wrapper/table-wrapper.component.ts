import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/common';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent implements OnInit {
  tableData: Array<any>;
  constructor(
    public productService: ProductsService,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.navigationService.setPageTitle('home');
  }
}
