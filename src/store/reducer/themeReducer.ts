/* eslint-disable @typescript-eslint/no-explicit-any */

import { SET_THEME } from "../type/actionType";

export interface IThemeReducer {
  themeReducer: {
    isDarkTheme: boolean;
  };
}
export interface IThemeModelResponse {
  isDarkTheme: boolean;
}

const initialState: IThemeModelResponse = {
  isDarkTheme: true, // Set initial value
};

const themeReducer = (
  state: IThemeModelResponse = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case SET_THEME: {
      return {
        ...state,
        isDarkTheme: payload.isDarkTheme,
      };
    }
    default:
      return state;
  }
};
export default themeReducer;
