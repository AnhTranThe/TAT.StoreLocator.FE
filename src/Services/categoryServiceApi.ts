import { ICategoryRequestModel } from "../models/categoryModel";
import { IPaginationRequestModel } from "../models/paginationModel";
import axiosInstance from "./configAxiosService";

export const getListCategoryService = async (
  request: IPaginationRequestModel
) => {
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
    const res = await axiosInstance.get(
      `/admin/category/getListCategory?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getListParentCategoryService = async (
  request: IPaginationRequestModel
) => {
  const { pageSize = 10, pageIndex = 1, searchString = "" } = request;
  try {
    const params = new URLSearchParams({
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    });
    if (searchString.length > 0) {
      params.append("searchString", searchString);
    }
    const res = await axiosInstance.get(
      `/admin/category/GetListParentCategory?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getListSubCategoryService = async (
  request: IPaginationRequestModel
) => {
  const { pageSize = 10, pageIndex = 1, searchString = "" } = request;
  try {
    const params = new URLSearchParams({
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    });
    if (searchString.length > 0) {
      params.append("searchString", searchString);
    }
    const res = await axiosInstance.get(
      `/admin/category/GetListsubCategory?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const createNewCategoryService = async (
  request: ICategoryRequestModel
) => {
  try {
    const res = await axiosInstance.post("/admin/category/add", request);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateCategoryService = async (
  id: string,
  request: ICategoryRequestModel
) => {
  try {
    const res = await axiosInstance.put(
      `/admin/category/update/${id}`,
      request
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
