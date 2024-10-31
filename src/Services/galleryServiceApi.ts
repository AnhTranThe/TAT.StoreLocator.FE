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
export const uploadImageService = async (data: FormData) => {
  try {
    const response = await axiosInstance.post("/gallery/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// export const uploadImageService = async (
//   request: IGalleryUploadRequestModel
// ) => {
//   try {
//     if (request.fileUpload) {
//       const formData = new FormData();
//       formData.append("fileUpload", request.fileUpload);
//       formData.append("isThumbnail", request.isThumbnail.toString());
//       formData.append("type", "store");
//       formData.append("typeId", request.typeId);
//       const res = await axiosInstance.post(`/gallery/add`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return res.data;
//     }
//   } catch (error) {
//     throw new Error("Failed to upload image");
//   }
// };

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
