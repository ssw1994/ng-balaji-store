export enum Status {
  none = 'None',
  busy = 'Busy',
  success = 'Success',
  error = 'Error',
}

export interface ProductFilters {
  category?: string;
  search?: string;
  price?: number;
}

export interface Page {
  pageName: string | null;
  pageURI: string | string[] | null;
}
