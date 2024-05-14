import { AppDispatch } from "../../hooks/ReduxHook";
import { GET_USER_LOGIN_INFO } from "../type/actionType";

export const getUserLoginInfo = (
  id: string,
  email: string,
  firstname: string,
  roles: string
) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_LOGIN_INFO,
      payload: { id, email, firstname, roles },
    });
  };
};
