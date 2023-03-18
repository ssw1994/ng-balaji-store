export interface CartItem {
  _id: string;
  cartId: string;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
  quantity: number;
}

export interface CartSummary {
  cart_total: number;
  count: number;
  delivery_charges: number;
  total_price: number;
  _id?: string;
}
