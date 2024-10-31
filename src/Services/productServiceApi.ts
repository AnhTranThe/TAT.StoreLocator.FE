import { IPaginationRequestModel } from "../models/paginationModel";
import { IProductRequestmodel } from "../models/productModel";
import axiosInstance from "./configAxiosService";

export const getListProductsService = async (
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
    const res = await axiosInstance.get(`/product/getAll?${params.toString()}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const createNewProductService = async (
  request: IProductRequestmodel
) => {
  try {
    const res = await axiosInstance.post("/admin/product/add", request);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateProductService = async (
  productId: string,
  request: IProductRequestmodel
) => {
  try {
    const res = await axiosInstance.put(
      `/admin/product/update/${productId}`,
      request
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
