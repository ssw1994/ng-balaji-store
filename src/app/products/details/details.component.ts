import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../filters/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  productDetails: any;

  qantity: FormControl<number | null> = new FormControl<number | null>(null);

  get cartId(): string | null {
    return localStorage.getItem('cartId');
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.route.params.subscribe((response: any) => {
      this.fetchProductDetails(response.id);
    });
  }

  addToCart(): void {
    try {
      this.productService
        .addToCart({
          id: this.cartId,
          item: {
            product_id: this.productDetails._id,
            price: this.productDetails.price,
          },
        })
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }

  saveForLater() {}

  getQuantity(quantity: any) {
    try {
      this.qantity.patchValue(quantity);
    } catch (error) {
      console.error(error);
    }
  }

  private async fetchProductDetails(id: string) {
    const details = await this.productService.getProductDetails(id);
    console.log(details);
    this.productDetails = details;
  }
}
