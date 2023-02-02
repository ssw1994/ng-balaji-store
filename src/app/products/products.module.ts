import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../common';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ProductsModule {}
