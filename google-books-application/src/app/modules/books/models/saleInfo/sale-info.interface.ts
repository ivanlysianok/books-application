import { Price } from "./price.interface";
import { Offers } from "./offers.interface";

export interface SaleInfo {
    buyLink: string;
    country: string;
    isEbook: boolean;
    listPrice: Price;
    offers: Offers[];
    retailPrice: Price;
    saleability: string;

}