import { VolumeInfo } from './volumeInfo/volume-info.interface';

export interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
  isFavorite: boolean;
}
