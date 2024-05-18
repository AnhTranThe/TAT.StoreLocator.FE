import {
  SET_ACTIVE_INFO_DETAIL,
  SET_ACTIVE_INFO_ITEM,
} from "../type/actionType";

export const setActiveInfoDetailAction = (isActive: boolean) => ({
  type: SET_ACTIVE_INFO_DETAIL,
  payload: isActive,
});

export const setActiveInfoItemAction = (itemId: string, isActive: boolean) => ({
  type: SET_ACTIVE_INFO_ITEM,
  payload: { itemId, isActive },
});
