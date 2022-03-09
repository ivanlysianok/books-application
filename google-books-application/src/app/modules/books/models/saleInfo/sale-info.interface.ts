import { Price } from './price.interface';
import { Offers } from './offers.interface';

export interface SaleInfo {
  buyLink: string;
  country: string;
  isEbook: boolean;
  listPrice: Price;
  offers: Offers[];
  onSaleDate: Date;
  retailPrice: Price;
  saleability: string;
}
