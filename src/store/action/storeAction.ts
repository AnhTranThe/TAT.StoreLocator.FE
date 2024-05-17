import { IStoreResponseModel } from "../../models/storeModel";
import { AppDispatch } from "../store";
import { GET_DETAIL_STORE } from "../type/actionType";

export const getDetailStoreInfo = (e: IStoreResponseModel) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_DETAIL_STORE,
      payload: e,
    });
  };
};
