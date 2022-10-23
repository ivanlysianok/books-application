import { Dimensions } from './dimensions.interface';
import { Identifiers } from './identifiers.interface';
import { ImageLinks } from './image-links.interface';
import { PanelizationSummary } from './penalization-summary.interface';
import { ReadingModes } from './reading-modes.intereface';

export interface VolumeInfo {
  averageRating: number;
  allowAnonLogging: boolean;
  authors?: string[];
  canonicalVolumeLink: string;
  categories?: string[];
  contentVersion: string;
  description: string;
  dimensions: Dimensions;
  imageLinks?: ImageLinks;
  industryIdentifiers: Identifiers[];
  infoLink: string;
  language: string;
  maturityRating: string;
  mainCategory: string;
  pageCount: number;
  panelizationSummary: PanelizationSummary;
  previewLink: string;
  printType: string;
  publishedDate: string;
  publisher: string;
  readingModes: ReadingModes;
  ratingsCount: number;
  title: string;
  subtitle: string;
}
