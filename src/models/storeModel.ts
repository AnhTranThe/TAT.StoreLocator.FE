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
import { IBaseResponseModel } from "./commonModel";
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
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: IAddressModel;
  products?: IProductSimpleModel[];
  reviews?: IReviewModel[];
  images?: IMapGalleryStoreModel[];
}

export interface IStoreRequestModel {
  name: string | "";
  email: string | "";
  phoneNumber: string | "";
  roadName: string | "";
  province: string | "";
  district: string | "";
  ward: string | "";
  postalCode: string | "";
  latitude: number | 0;
  longitude: number | 0;
  isActive: boolean | true;
  // files: File[] | [];
}

export interface ICreateStoreResponseModel {
  baseResponse: IBaseResponseModel;
  storeResponseModel: IStoreModel;
}

export interface IStoreGetNearRequestModel {
  district: string;
  ward: string;
  province: string;
  keyWord: string;
  categories: string;
}
