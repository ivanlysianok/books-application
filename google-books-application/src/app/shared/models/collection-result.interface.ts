export interface CollectionResultModel<T> {
  kind: string;
  totalItems: number;
  items: T;
}
