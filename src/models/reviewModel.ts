import { EReviewStatusType } from "../enums";
import { IBaseEntityModel } from "./baseEntityModel";
import { IBaseResponseModel } from "./commonModel";
import {
  IPaginationRequestModel,
  IPaginationResponseModel,
} from "./paginationModel";

export interface IReviewModel extends IBaseEntityModel {
  content: string;
  ratingValue: number;
  status?: EReviewStatusType;
  userId?: string;
  storeId?: string;
  userEmail?: string;
}

export interface IBaseReviewFilterRequestModel extends IPaginationRequestModel {
  searchRatingKey?: string;
  typeId: string;
}

export interface IReviewPaginationResponseModel
  extends IPaginationResponseModel {
  data: IReviewModel[];
}
export interface IReviewRequestModel {
  typeId: string;
  content: string;
  type: string;
  userId: string;
  ratingValue: number;
  status: EReviewStatusType;
}
export interface IReviewResultResponseModel extends IBaseResponseModel {
  Data: IReviewModel[];
}
