import { IBaseEntityModel } from "./baseEntityModel";
import { IGalleryResponseModel } from "./galleryModel";

export interface ICategoryResponseModel extends IBaseEntityModel {
  name: string;
  description?: string;
  slug?: string;
  isActive: boolean;
  gallery?: IGalleryResponseModel;
}
