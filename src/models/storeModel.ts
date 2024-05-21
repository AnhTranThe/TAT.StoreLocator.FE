// export interface IUserModel {
//     Id: string;
//     FullName: string;
//     Email: string;
//     IsActive: boolean;
//     Gender: EGenderType;
//     Dob: string;
//     UserName: string;
//     WishlistProductsCount: number;
//     WishlistStoresCount: number;
//     ReviewProductsCount: number;
//     AccessToken: string;
//     RefreshToken: string;
//     Roles: string[] | null;
//   }

import { IAddressModel } from "./addressModel";
import { IBaseEntityModel } from "./baseEntityModel";
import { IGalleryModel } from "./galleryModel";
import { IProductModel } from "./productModel";
import { IReviewModel } from "./reviewModel";
import { IWishlistModel } from "./wishlistModel";

export interface IStoreModel extends IBaseEntityModel {
  name: string;
  email: string;
  phoneNumber?: string;
  address: IAddressModel;
  reviews?: IReviewModel[];
  galleries?: IGalleryModel[];
  products?: IProductModel[];
  wishlists?: IWishlistModel[];
  averageRating?: number;
}
