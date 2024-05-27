import { IBaseReviewFilterRequestModel } from "../models/reviewModel";
import axiosInstance from "./configAxiosService";

export const getListReviewsByStoreService = async (
  request: IBaseReviewFilterRequestModel
) => {
  const {
    pageSize = 10,
    pageIndex = 1,
    searchString = "",
    searchRatingKey = "",
    typeId = "",
  } = request;
  try {
    const params = new URLSearchParams({
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    });
    if (typeId.length > 0) {
      params.append("typeId", typeId);
    }
    if (searchString.length > 0) {
      params.append("searchString", searchString);
    }
    if (searchRatingKey.length > 0) {
      params.append("searchRatingKey", searchRatingKey);
    }

    // Make the API request with query parameters
    const res = await axiosInstance.get(
      `/review/getReviewByStore?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// export const createNewCategoryService = async (
//   request: ICategoryRequestModel
// ) => {
//   try {
//     const res = await axiosInstance.post("/admin/category/add", request);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };
// export const updateCategoryService = async (
//   id: string,
//   request: ICategoryRequestModel
// ) => {
//   try {
//     const res = await axiosInstance.put(
//       `/admin/category/update/${id}`,
//       request
//     );
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };
