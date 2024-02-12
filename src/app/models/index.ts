export interface ICompany {
  name: string;
  domain: string;
  category: string;
  price: number;
}

export interface IFilter {
  name: string;
  domain: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}
