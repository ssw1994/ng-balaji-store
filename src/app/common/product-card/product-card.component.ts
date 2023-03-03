import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: any;

  @HostListener('click')
  onClick() {
    this.navigationService.setPage(this.product.title, [
      '/',
      'products',
      'details',
      this.product._id,
    ]);
  }

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {}
}
