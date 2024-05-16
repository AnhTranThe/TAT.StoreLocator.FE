import { EReviewStatusType } from "../enums";
import { IBaseEntityModel } from "./baseEntityModel";

export interface IReviewResponseModel extends IBaseEntityModel {
  content: string;
  ratingValue: number;
  status: EReviewStatusType;
}
