import { IBaseEntityModel } from "./baseEntityModel";
import { IPaginationResponseModel } from "./paginationModel";
import { IProductModel } from "./productModel";

export interface ICategoryRequestModel {
  name: string;
  description?: string;
  slug?: string;
  isActive: boolean;
  parentCategoryId?: string;
}

export interface ICategoryModel extends IBaseEntityModel {
  name: string;
  description?: string;
  slug?: string;
  isActive: boolean;
  parentCategoryName?: string;
  parentCategoryId?: string;
  productResponseModels?: IProductModel[];
}
export interface ICategoryPaginationResponseModel
  extends IPaginationResponseModel {
  data: ICategoryModel[];
}
