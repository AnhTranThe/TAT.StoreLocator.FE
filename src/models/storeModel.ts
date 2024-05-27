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

import { IAddressModel, IAddressStoreRequestModel } from "./addressModel";
import { IBaseEntityModel } from "./baseEntityModel";
import { IMapGalleryStoreModel } from "./galleryModel";
import { IPaginationResponseModel } from "./paginationModel";
import { IProductSimpleModel } from "./productModel";
import { IReviewModel } from "./reviewModel";

export interface IStoreModel extends IBaseEntityModel {
  name: string;
  email: string;
  phoneNumber?: string;
  address: IAddressModel;
  ratingStore?: IRatingStoreModel;
  mapGalleryStores?: IMapGalleryStoreModel[];
  isActive: boolean;
  reviews: IReviewModel[];
}
export interface IRatingStoreModel {
  numberRating: number;
  pointOfRating: number;
}

export interface IStorePaginationResponseModel
  extends IPaginationResponseModel {
  data: IStoreModel[] | IStoreSimpleResponseModel[];
}

export interface IStoreSimpleResponseModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: IAddressModel;
  products: IProductSimpleModel[];
  reviews: IReviewModel[];
}

export interface IStoreRequestModel {
  name: string | "";
  email: string | "";
  phoneNumber: string | "";
  address: IAddressStoreRequestModel;
  isActive: boolean | true;
  // files: File[] | [];
}

export interface IStoreGetNearRequestModel {
  district: string;
  ward: string;
  province: string;
  keyWord: string;
  categories: string;
}
