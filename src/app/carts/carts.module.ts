import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartListComponent } from './my-cart-list/my-cart-list.component';
import { BaseUrlInterceptor, SharedModule } from '../common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyCartItemComponent } from './my-cart-item/my-cart-item.component';
import { RouterModule, Routes } from '@angular/router';
import { MyCartWrapperComponent } from './my-cart-wrapper/my-cart-wrapper.component';

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
  declarations: [
    MyCartListComponent,
    MyCartItemComponent,
    MyCartWrapperComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(routes),
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
