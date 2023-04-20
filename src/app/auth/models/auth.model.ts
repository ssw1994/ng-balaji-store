export interface Address {
  name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  latitude?: number | null;
  longitude?: number | null;
  _id?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string | null;
  password: string | null;
  mobile: string | null;
  email: string | null;
}
