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
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddressComponent } from './address/address.component';
import { MyCartSummaryComponent } from './my-cart-summary/my-cart-summary.component';
import { StepContainerComponent } from './step-container/step-container.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyCartItemComponent } from './my-cart-item/my-cart-item.component';
const shared = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatChipsModule,
  MatDividerModule,
  MatListModule,
  MatDialogModule,
  MatTooltipModule,
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
    MyCartSummaryComponent,
    StepContainerComponent,
    ExpansionPanelComponent,
    UserAddressComponent,
    MyOrdersComponent,
    MyCartItemComponent,
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
    MyCartSummaryComponent,
    AddressComponent,
    StepContainerComponent,
    ...shared,
    ExpansionPanelComponent,
    UserAddressComponent,
    MyCartItemComponent,
  ],
})
export class SharedModule {}
