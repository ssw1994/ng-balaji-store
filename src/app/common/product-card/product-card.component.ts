import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AppFacde } from '../../store/app.facade';

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
    this.appFacade.navigate({
      pageName: this.product.title,
      pageURI: ['/', 'products', 'details', this.product._id],
    });
  }

  constructor(private appFacade: AppFacde) {}

  ngOnInit(): void {}
}
