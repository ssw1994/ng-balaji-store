import { Address } from '../../auth/models/auth.model';

export const REGEX = {
  MOBILE: '^[0-9]{10}',
};

export enum PAYMENT_METHOD {
  netbanking = 'netbanking',
  upi = 'upi',
  cards = 'cards',
  cod = 'cod',
}

export interface ConfirmConfig {
  title: string;
  message: string;
}

export enum ConfirmChoice {
  confirm,
  cancel,
}

export interface AbstractOrder {
  customer_id: string;
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
  total_price: number;
  shipping_address: Address | null;
  billing_address: Address | null;
  payment_method: string | null;
}
