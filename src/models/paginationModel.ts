export interface IPaginationResponseModel {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  totalPageCount: number;
  searchTerm: string;
}
export interface IPaginationRequestModel {
  pageSize?: number;
  pageIndex?: number;
  searchString?: string;
}
