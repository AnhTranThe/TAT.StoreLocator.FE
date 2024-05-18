import {
  SET_ACTIVE_INFO_DETAIL,
  SET_ACTIVE_INFO_ITEM,
} from "../type/actionType";
export interface IActiveInfoItem {
  itemId: string;
  isActive: boolean;
}
const emptyActiveInfoItem: IActiveInfoItem = {
  itemId: "",
  isActive: false,
};
const initialState = {
  isActiveInFoDetail: false,
  activeInfoItem: emptyActiveInfoItem,
};
const infoDetailReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: any
) => {
  switch (type) {
    case SET_ACTIVE_INFO_DETAIL:
      return {
        ...state,
        isActiveInFoDetail: payload,
      };
    case SET_ACTIVE_INFO_ITEM:
      return {
        ...state,
        activeInfoItem: payload,
      };
    default:
      return state;
  }
};

export default infoDetailReducer;
