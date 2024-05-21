import { IStoreModel } from "../../models/storeModel";
import { AppDispatch } from "../store";
import {
  GET_DETAIL_STORE,
  GET_LIST_STORE_BY_SEARCH_KEY,
} from "../type/actionType";

export const getDetailStoreInfo = (e: IStoreModel) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_DETAIL_STORE,
      payload: e,
    });
  };
};
export const getListStoreItemsBySearchKeyAction =
  (e: IStoreModel[]) => async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_LIST_STORE_BY_SEARCH_KEY,
      payload: e,
    });
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
