import { IStorePaginationResponseModel } from "../../models/storeModel";
import axiosInstance from "../../Services/configAxiosService";
import { AppDispatch } from "../store";
import { GET_DETAIL_STORE, GET_LIST_STORES_NEAR } from "../type/actionType";

export const getDetailStoreInfo =
  (storeId: string) => async (dispatch: AppDispatch) => {
    const res = await axiosInstance.get(`/store/getDetail/${storeId}`);
    if (res) {
      console.log(res);

      dispatch({
        type: GET_DETAIL_STORE,
        payload: res.data,
      });
    }
  };
export const getListNearStoreAction = (e: IStorePaginationResponseModel) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_LIST_STORES_NEAR,
      payload: e,
    });
  };
};

// export const getListStoreItemsAction = () => async (dispatch: AppDispatch) => {
//   const res = await axiosInstance.get("/project");
//   if (res) {
//     dispatch({
//       type: GET_PROJECT_ALL,
//       payload: res.data,
//     });
//   }
// };
