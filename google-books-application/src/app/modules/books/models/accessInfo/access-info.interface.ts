import { BookFormat } from "./book-format.interface";
import { DownloadAccess } from "./download-access.interface";

export interface AccessInfo {
  accessViewStatus: string;
  country: string;
  downloadAccess: DownloadAccess
  embeddable: boolean;
  epub: BookFormat;
  pdf: BookFormat;
  publicDomain: boolean;
  quoteSharingAllowed: boolean;
  textToSpeechPermission: string;
  viewability: string;
  webReaderLink: string;
}
