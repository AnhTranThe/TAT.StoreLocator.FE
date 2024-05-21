import { ICategoryRequestModel } from "../models/categoryModel";
import axiosInstance from "./configAxiosService";

export const getListCategoryService = async () => {
  try {
    const res = await axiosInstance.get("/admin/category/getListCategory");
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getListParentCategoryService = async () => {
  try {
    const res = await axiosInstance.get(
      "/admin/category/GetListParentCategory"
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getListSubCategoryService = async () => {
  try {
    const res = await axiosInstance.get("/admin/category/GetListsubCategory");
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
    const res = await axiosInstance.put(`/api/category/update/${id}`, request);
    return res.data;
  } catch (error) {
    return error;
  }
};
