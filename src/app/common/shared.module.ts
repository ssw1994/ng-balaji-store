import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ImgGalleryComponent,
    ImgGalleryComponent,
  ],
  imports: [CommonModule],
  exports: [ProductCardComponent],
})
export class SharedModule {}
