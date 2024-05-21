export interface IPaginationResponseModel {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  totalPageCount: number;
  searchTerm: string;
}
