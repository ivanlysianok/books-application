import { Identifiers } from './identifiers.interface';
import { ImageLinks } from './image-links.interface';

export interface VolumeInfo {
  title: string;
  subtitle: string;
  averageRating: number;
  authors?: string[];
  categories?: string[];
  description: string;
  language: string;
  imageLinks?: ImageLinks;
  industryIdentifiers: Identifiers[];
  infoLink: string;
  pageCount: number;
  printType: string;
  publishedDate: string;
  publisher: string;
}
