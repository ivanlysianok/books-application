import { AccessInfo } from './accessInfo/access-info.interface';
import { SaleInfo } from './saleInfo/sale-info.interface';
import { SearchInfo } from './searchInfo/search-info.interface';
import { UserInfo } from './userInfo/user-info.interface';
import { VolumeInfo } from './volumeInfo/volume-info.interface';

export interface Volume {
  accessInfo: AccessInfo;
  etag: string;
  id: string;
  kind: string;
  saleInfo: SaleInfo;
  searchInfo: SearchInfo;
  selfLink: string;
  volumeInfo: VolumeInfo;
  userInfo: UserInfo;
}
