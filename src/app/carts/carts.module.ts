import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartListComponent } from './my-cart-list/my-cart-list.component';
import { BaseUrlInterceptor, SharedModule } from '../common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MyCartWrapperComponent } from './my-cart-wrapper/my-cart-wrapper.component';
import { StoreModule } from '@ngrx/store';
import { cartFeature } from './store/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';

const routes: Routes = [
  {
    path: '',
    component: MyCartWrapperComponent,
    children: [
      {
        path: 'my-cart',
        component: MyCartListComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-cart',
      },
    ],
  },
];

@NgModule({
  declarations: [MyCartListComponent, MyCartWrapperComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(cartFeature),
    EffectsModule.forFeature([CartEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
})
export class CartsModule {}
