import { SaleInfo } from './saleInfo/sale-info.interface';
import { VolumeInfo } from './volumeInfo/volume-info.interface';

export interface BookItem {
  id: string;
  saleInfo: SaleInfo;
  volumeInfo: VolumeInfo;
  isFavorite: boolean;
}
