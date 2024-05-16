import { IBaseEntityModel } from "./baseEntityModel";

export interface IGalleryResponseModel extends IBaseEntityModel {
  url: string;
  isThumbnail: boolean;
}
