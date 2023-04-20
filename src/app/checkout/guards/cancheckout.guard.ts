import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { take } from 'rxjs';
import { map, Observable } from 'rxjs';
import { CartsService } from '../../carts/services/carts.service';

@Injectable({
  providedIn: 'root',
})
export class CancheckoutGuard implements CanActivate {
  constructor(private cartService: CartsService) {}

  get cartId(): string {
    const id = localStorage.getItem('cartId');
    return id || '';
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cartService.getCartItems(this.cartId).pipe(
      map((response: any) => {
        console.log(response);
        return response?.data?.length > 0;
      }),
      take(1)
    );
  }
}
