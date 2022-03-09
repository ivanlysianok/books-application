export interface DownloadAccess {
  kind: 'books#downloadAccessRestriction';
  volumeId: string;
  restricted: boolean;
  deviceAllowed: boolean;
  justAcquired: boolean;
  maxDownloadDevices: number;
  downloadsAcquired: number;
  nonce: string;
  source: string;
  reasonCode: string;
  message: string;
  signature: string;
}
