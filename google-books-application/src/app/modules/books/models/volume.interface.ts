import { SaleInfo } from './saleInfo/sale-info.interface';
import { VolumeInfo } from './volumeInfo/volume-info.interface';

export interface Volume {
  id: string;
  saleInfo: SaleInfo;
  volumeInfo: VolumeInfo;
}
