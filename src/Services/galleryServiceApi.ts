import {
  IGalleryUpdateRequestModel,
  IGetListGalleryByIdRequestModel,
} from "../models/galleryModel";
import { IPaginationRequestModel } from "../models/paginationModel";
import axiosInstance from "./configAxiosService";

export const getAllImagesService = async (request: IPaginationRequestModel) => {
  const { pageSize = 10, pageIndex = 1, searchString = "" } = request;
  try {
    const params = new URLSearchParams({
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    });
    if (searchString.length > 0) {
      params.append("searchString", searchString);
    }
    // Make the API request with query parameters
    const res = await axiosInstance.get(`/gallery/getall?${params.toString()}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getListImagesByIdService = async (
  request: IGetListGalleryByIdRequestModel
) => {
  const {
    pageSize = 10,
    pageIndex = 1,
    searchString = "",
    type = "",
    id = "",
  } = request;
  try {
    const params = new URLSearchParams({
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    });
    if (searchString.length > 0) {
      params.append("searchString", searchString);
    }
    if (type.length > 0) {
      params.append("type", type);
    }
    if (id.length > 0) {
      params.append("id", id);
    }
    const res = await axiosInstance.get(
      `/gallery/getlistbyid?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateImageService = async (
  id: string,
  request: IGalleryUpdateRequestModel
) => {
  try {
    const res = await axiosInstance.put(`/gallery/update/${id}`, request);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const deleteImageService = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/gallery/delete/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
