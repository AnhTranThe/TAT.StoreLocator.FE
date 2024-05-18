// export interface IUserResponseModel {
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

import { IAddressResponseModel } from "./addressModel";
import { IBaseEntityModel } from "./baseEntityModel";
import { IGalleryResponseModel } from "./galleryModel";
import { IProductResponseModel } from "./productModel";
import { IReviewResponseModel } from "./reviewModel";
import { IWishlistResponseModel } from "./wishlistModel";

export interface IStoreResponseModel extends IBaseEntityModel {
  name: string;
  email: string;
  phoneNumber?: string;
  address: IAddressResponseModel;
  reviews?: IReviewResponseModel[];
  galleries?: IGalleryResponseModel[];
  products?: IProductResponseModel[];
  wishlists?: IWishlistResponseModel[];
  averageRating?: number;
}