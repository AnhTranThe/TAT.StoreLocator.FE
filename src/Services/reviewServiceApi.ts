import {
  IBaseReviewFilterRequestModel,
  IReviewRequestModel,
} from "../models/reviewModel";
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

export const createNewReviewService = async (request: IReviewRequestModel) => {
  try {
    const res = await axiosInstance.post("/review/create", request);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateReviewService = async (
  reviewId: string,
  request: IReviewRequestModel
) => {
  try {
    const res = await axiosInstance.put(`/review/update/${reviewId}`, request);
    console.log(res);
    return res.data;
  } catch (error) {
    return error;
  }
};
