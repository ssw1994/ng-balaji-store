import { Address } from '../../auth/models/auth.model';
import { CartItem } from '../../carts/models/cart.model';

export enum OrderStatus {
  in_progress,
  shipping,
  delivered,
}
export interface Order {
  items: [CartItem];
  shipping_address: Address;
  billing_address: Address;
  order_status: OrderStatus;
  order_date: string;
  order_quantity: number;
  updated_date: string;
  order_total: number;
}
