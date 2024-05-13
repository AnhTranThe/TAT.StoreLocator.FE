import { AppDispatch } from "../store";
import { SET_THEME } from "../type/actionType";

export const setTheme = (isDarkTheme: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: SET_THEME,
      payload: {
        isDarkTheme,
      },
    });
  };
};
