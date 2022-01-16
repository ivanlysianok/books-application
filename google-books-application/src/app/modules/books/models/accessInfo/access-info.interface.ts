import { BookFormat } from "./book-format.interface";

export interface AccessInfo {
  accessViewStatus: string;
  country: string;
  embeddable: boolean;
  epub: BookFormat;
  pdf: BookFormat;
  publicDomain: boolean;
  quoteSharingAllowed: boolean;
  textToSpeechPermission: string;
  viewability: string;
  webReaderLink: string;
}
