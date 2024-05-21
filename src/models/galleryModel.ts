import { IBaseEntityModel } from "./baseEntityModel";

export interface IGalleryModel extends IBaseEntityModel {
  url: string;
  isThumbnail: boolean;
}
