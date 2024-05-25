import { IPaginationRequestModel } from "../models/paginationModel";
import { IStoreModel, IStoreRequestModel } from "../models/storeModel";
import axiosInstance, {
  CONTENT_TYPE_FORM_DATA,
  CONTENT_TYPE_JSON,
} from "./configAxiosService";

export const getListStoreService = async (request: IPaginationRequestModel) => {
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
    const res = await axiosInstance.get(`/store/getAll?${params.toString()}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createNewStoreService = async (request: IStoreRequestModel) => {
  try {
    let res;
    if (request.files && request.files.length > 0) {
      // Handle multipart/form-data request
      const formData = new FormData();
      formData.append("name", request.name);
      formData.append("email", request.email);
      formData.append("phoneNumber", request.phoneNumber);
      formData.append("address", JSON.stringify(request.address)); // Assuming address is a nested object
      formData.append("isActive", request.isActive.toString());

      request.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file); // Assuming files is an array of File objects
      });

      res = await axiosInstance.post("/admin/store/create", formData, {
        headers: {
          "Content-Type": CONTENT_TYPE_FORM_DATA,
        },
      });
    } else {
      // Handle application/json request
      res = await axiosInstance.post("/admin/store/create", request, {
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });
    }

    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateStoreService = async (
  id: string,
  request: IStoreRequestModel
) => {
  try {
    let res;
    if (request.files && request.files.length > 0) {
      // Handle multipart/form-data request
      const formData = new FormData();
      formData.append("name", request.name);
      formData.append("email", request.email);
      formData.append("phoneNumber", request.phoneNumber);
      formData.append("address", JSON.stringify(request.address)); // Assuming address is a nested object
      formData.append("isActive", request.isActive.toString());

      request.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file); // Assuming files is an array of File objects
      });

      res = await axiosInstance.put(`/admin/store/update/${id}`, formData, {
        headers: {
          "Content-Type": CONTENT_TYPE_FORM_DATA,
        },
      });
    } else {
      // Handle application/json request
      res = await axiosInstance.post(`/admin/store/update/${id}`, request, {
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });
    }
    return res.data;
  } catch (error) {
    return error;
  }
};

export const calAverageRatingValueFunc = (arrRating: number[]) => {
  if (arrRating.length === 0) {
    return 0;
  }
  const sum = arrRating.reduce(
    (total, currentValue) => total + currentValue,
    0
  );
  const avgRating = sum / arrRating.length;
  return avgRating;
};

const calculateAverageRating = (reviews: IReviewModel[]): number => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce(
    (sum, review) => sum + review.ratingValue,
    0
  );
  return totalRating / reviews.length;
};
export const updateStoresWithAverageRating = (
  stores: IStoreModel[]
): IStoreModel[] => {
  return stores.map((store) => ({
    ...store,
    averageRating: 0,

    //store.reviews && calculateAverageRating(store.reviews),
  }));
};
