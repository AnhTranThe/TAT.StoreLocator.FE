import { EReviewStatusType } from "../enums";
import { IBaseEntityModel } from "./baseEntityModel";

export interface IReviewModel extends IBaseEntityModel {
  content: string;
  ratingValue: number;
  status: EReviewStatusType;
}
