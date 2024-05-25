import { IStoreModel } from "../../models/storeModel";

import {
  GET_DETAIL_STORE,
  GET_LIST_STORE_BY_SEARCH_KEY,
} from "../type/actionType";

interface IInitialState {
  detailStoreItemInfo: IStoreModel;
  listStoreItemBySearchKey: IStoreModel[];
}
const emptyDetailStoreItemInfo: IStoreModel = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  address: {
    id: "",
    roadName: "",
    province: "",
    district: "",
    ward: "",
    postalCode: "",
    latitude: 0,
    longitude: 0,
  },
  averageRating: 0,
  mapGalleryStores: [],
};

const initialState: IInitialState = {
  detailStoreItemInfo: emptyDetailStoreItemInfo,
  listStoreItemBySearchKey: [],
};
const storeReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: any
) => {
  switch (type) {
    case GET_DETAIL_STORE: {
      return {
        ...state,
        detailStoreItemInfo: payload,
      };
    }
    case GET_LIST_STORE_BY_SEARCH_KEY: {
      return {
        ...state,
        listStoreItemBySearchKey: payload,
      };
    }
    default:
      return state;
  }
};

export default storeReducer;
