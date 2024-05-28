import {
  IStoreModel,
  IStorePaginationResponseModel,
  IStoreSimpleResponseModel,
} from "../../models/storeModel";

import { GET_DETAIL_STORE, GET_LIST_STORES_NEAR } from "../type/actionType";

interface IInitialState {
  detailStoreItemInfo: IStoreModel;
  listStoresNear: IStorePaginationResponseModel;
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
  isActive: false,
  mapGalleryStores: [],
  reviews: [],
};
export const emptyStoreSimple: IStoreSimpleResponseModel = {
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
};

const emptyListStoresNear: IStorePaginationResponseModel = {
  pageSize: 10,
  pageIndex: 1,
  totalCount: 0,
  totalPageCount: 0,
  searchTerm: "",
  data: [],
};
const initialState: IInitialState = {
  detailStoreItemInfo: emptyDetailStoreItemInfo,
  listStoresNear: emptyListStoresNear,
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
    case GET_LIST_STORES_NEAR: {
      return {
        ...state,
        listStoresNear: payload,
      };
    }
    default:
      return state;
  }
};

export default storeReducer;
