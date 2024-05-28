import { IPaginationRequestModel } from "../models/paginationModel";
import {
  IStoreGetNearRequestModel,
  IStoreRequestModel,
} from "../models/storeModel";
import axiosInstance from "./configAxiosService";

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

export const getListNearStoreService = async (
  getNearStoreRequest: IStoreGetNearRequestModel,
  pagingRequest: IPaginationRequestModel
) => {
  const { pageSize = 10, pageIndex = 1 } = pagingRequest;
  const { district, ward, province, keyWord, categories } = getNearStoreRequest;
  try {
    const params = new URLSearchParams({
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    });
    if (district.length > 0) {
      params.append("district", district);
    }
    if (ward.length > 0) {
      params.append("ward", ward);
    }
    if (province.length > 0) {
      params.append("province", province);
    }
    if (keyWord.length > 0) {
      params.append("keyWord", keyWord);
    }
    if (categories.length > 0) {
      params.append("categories", categories);
    }
    // Make the API request with query parameters
    const res = await axiosInstance.get(
      `/store/getNearStore?${params.toString()}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// export const createNewReviewService = async (request: IReviewRequestModel) => {
//   try {
//     const res = await axiosInstance.post("/review/create", request);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

export const createNewStoreService = async (request: IStoreRequestModel) => {
  try {
    const res = await axiosInstance.post("/admin/store/create", request);
    console.log(res.data);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateStoreService = async (
  storeId: string,
  request: IStoreRequestModel
) => {
  try {
    const res = await axiosInstance.put(
      `/admin/store/update/${storeId}`,
      request
    );
    console.log(res);
    return res.data;
  } catch (error) {
    return error;
  }
};

// export const updateStoreService = async (
//   id: string,
//   request: IStoreRequestModel
// ) => {
//   try {
//     let res;
//     if (request.files && request.files.length > 0) {
//       // Handle multipart/form-data request
//       const formData = new FormData();
//       formData.append("name", request.name);
//       formData.append("email", request.email);
//       formData.append("phoneNumber", request.phoneNumber);
//       formData.append("address", JSON.stringify(request.address)); // Assuming address is a nested object
//       formData.append("isActive", request.isActive.toString());

//       request.files.forEach((file, index) => {
//         formData.append(`files[${index}]`, file); // Assuming files is an array of File objects
//       });

//       res = await axiosInstance.put(`/admin/store/update/${id}`, formData, {
//         headers: {
//           "Content-Type": CONTENT_TYPE_FORM_DATA,
//         },
//       });
//     } else {
//       // Handle application/json request
//       res = await axiosInstance.post(`/admin/store/update/${id}`, request, {
//         headers: {
//           "Content-Type": CONTENT_TYPE_JSON,
//         },
//       });
//     }
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const calAverageRatingValueFunc = (arrRating: number[]) => {
//   if (arrRating.length === 0) {
//     return 0;
//   }
//   const sum = arrRating.reduce(
//     (total, currentValue) => total + currentValue,
//     0
//   );
//   const avgRating = sum / arrRating.length;
//   return avgRating;
// };
