export interface IWishlistResponseModel {
  total: number;
  userId: string;
  data: IStoreWishlistModel[] | IProductWishlistModel[];
}
export interface IStoreWishlistModel {
  isFav: boolean;
  storeId: string;
}
export interface IProductWishlistModel {
  wishlistId: string;
  productId: string;
}
