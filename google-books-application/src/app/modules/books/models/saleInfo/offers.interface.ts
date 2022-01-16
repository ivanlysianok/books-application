import { OffersPrice } from './offers-price.interface';

export interface Offers {
  finskyOfferType: number;
  listPrice: OffersPrice;
  retailPrice: OffersPrice;
}
