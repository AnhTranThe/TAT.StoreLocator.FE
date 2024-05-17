import { IStoreResponseModel } from "../../models/storeModel";

import { GET_DETAIL_STORE } from "../type/actionType";

interface IInitialState {
  detailStoreItemInfo: IStoreResponseModel;
}

const emptyDetailStoreItemInfo: IStoreResponseModel = {
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
  reviews: [],
  galleries: [],
  products: [],
  wislists: [],
  averageRating: 0,
};

const initialState: IInitialState = {
  detailStoreItemInfo: emptyDetailStoreItemInfo,
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
    default:
      return state;
  }
};

export default storeReducer;
