import { IBaseEntityModel } from "./baseEntityModel";
import {
  IPaginationRequestModel,
  IPaginationResponseModel,
} from "./paginationModel";

export interface IGalleryModel extends IBaseEntityModel {
  url: string;
  isThumbnail: boolean;
  fileBelongsTo?: string;
  fileName?: string;
  publicId?: string;
}
export interface IMapGalleryStoreModel {
  galleryId: string;
  fileName: string;
  url: string;
  isThumbnail: boolean;
}
export interface IGalleryUploadRequestModel {
  fileUpload?: File;
  isThumbnail: boolean;
  Type: string;
  TypeId: string;
}
export interface IGalleryUpdateRequestModel {
  isThumbnail: boolean;
  type: string;
  typeId: string;
}

export interface IGetListGalleryByIdRequestModel
  extends IPaginationRequestModel {
  type: string;
  id: string;
}
export interface IGalleryPaginationResponseModel
  extends IPaginationResponseModel {
  data: IGalleryModel[];
}
