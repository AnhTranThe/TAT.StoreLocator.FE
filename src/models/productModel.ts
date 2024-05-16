import { IBaseEntityModel } from "./baseEntityModel";
import { ICategoryResponseModel } from "./categoryModel";
import { IGalleryResponseModel } from "./galleryModel";
import { IReviewResponseModel } from "./reviewModel";
import { IStoreResponseModel } from "./storeModel";
import { IWishlistResponseModel } from "./wishlistModel";

export interface IProductResponseModel extends IBaseEntityModel {
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
  reviews?: IReviewResponseModel[];
  category?: ICategoryResponseModel;
  galleries?: IGalleryResponseModel[];
  store?: IStoreResponseModel;
  wishlists?: IWishlistResponseModel[];
}
