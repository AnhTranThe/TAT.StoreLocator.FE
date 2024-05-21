import { AppDispatch } from "../../hooks/ReduxHook";
import { GET_USER_LOGIN_INFO } from "../type/actionType";

export const getUserLoginInfo = (
  id: string,
  email: string,
  firstName: string,
  roles: string
) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_LOGIN_INFO,
      payload: { id, email, firstName, roles },
    });
  };
};
