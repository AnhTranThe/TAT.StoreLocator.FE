import {
  SET_ACTIVE_TAB,
  SET_ACTIVE_TAB_MENU_PROFILE,
} from "../type/actionType";

export const setActiveTabAction = (tabName: string) => ({
  type: SET_ACTIVE_TAB,
  payload: tabName,
});
export const setActiveTabMenuProfileAction = (tabMenuIndex: number) => ({
  type: SET_ACTIVE_TAB_MENU_PROFILE,
  payload: tabMenuIndex,
});
