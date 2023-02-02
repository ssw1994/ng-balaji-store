import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: any;

  @HostListener('click')
  async onClick() {
    await this.router.navigate(['/', 'products', 'details', this.product._id]);
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
