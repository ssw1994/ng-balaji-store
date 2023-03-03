import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemQuantityComponent } from './item-quantity/item-quantity.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MyCartComponent } from '../carts';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { AddressComponent } from './address/address.component';
const shared = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatChipsModule,
  MatDividerModule,
];

@NgModule({
  declarations: [
    ProductCardComponent,
    ImgGalleryComponent,
    ImgGalleryComponent,
    HeaderComponent,
    ItemQuantityComponent,
    StarRatingComponent,
    AddressComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyCartComponent,
    ...shared,
  ],
  exports: [
    ProductCardComponent,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    ImgGalleryComponent,
    ItemQuantityComponent,
    StarRatingComponent,
    ...shared,
  ],
})
export class SharedModule {}
