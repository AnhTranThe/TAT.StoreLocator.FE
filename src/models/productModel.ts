import { IBaseEntityModel } from "./baseEntityModel";
import { ICategoryModel } from "./categoryModel";
import { IGalleryModel } from "./galleryModel";
import { IPaginationResponseModel } from "./paginationModel";
import { IReviewModel } from "./reviewModel";
import { IStoreModel } from "./storeModel";
import { IWishlistModel } from "./wishlistModel";

export interface IProductModel extends IBaseEntityModel {
  name: string | null;
  description?: string;
  content?: string;
  note?: string;
  slug?: string;
  price?: number;
  discount?: number; // in percent
  metaTitle?: string;
  metaDescription?: string;
  quantity?: number;
  rating: number;
  sku?: string;
  isActive: boolean;
  productViewCount?: number;
  reviews?: IReviewModel[];
  category?: ICategoryModel;
  galleries?: IGalleryModel[];
  store?: IStoreModel;
  wishlists?: IWishlistModel[];
  categoryId?: string;
  storeId?: string;
}

export interface IProductSimpleModel {
  id: string;
  name: string;
}
export interface IProductRequestmodel {
  name?: string;
  description?: string;
  content?: string;
  note?: string;
  slug?: string;
  price: number;
  discount: number;
  metaTitle?: string;
  metaDescription?: string;
  quantity: number;
  rating: number;
  sKU?: string;
  isActive: boolean;
  productViewCount: number;
  categoryId?: string;
  storeId?: string;
}

export interface IProductPaginationResponseModel
  extends IPaginationResponseModel {
  data: IProductModel[];
}
