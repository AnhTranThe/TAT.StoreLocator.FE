import {
  SET_ACTIVE_TAB,
  SET_ACTIVE_TAB_MENU_PROFILE,
} from "../type/actionType";

const initialState = {
  activeTab: "home",
  activeTabMenuProfileIndex: 1,
};
const tabReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: any
) => {
  switch (type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: payload,
      };
    case SET_ACTIVE_TAB_MENU_PROFILE:
      return {
        ...state,
        activeTabMenuProfileIndex: payload,
      };
    default:
      return state;
  }
};

export default tabReducer;
