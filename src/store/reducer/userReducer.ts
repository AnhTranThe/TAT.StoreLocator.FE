import { IUserSaveInfoModel } from "../../models/authModel";

import { GET_USER_LOGIN_INFO } from "../type/actionType";

interface IInitialState {
  userLoginInfo: IUserSaveInfoModel;
}

const emptyUserLogInInfo: IUserSaveInfoModel = {
  id: "",
  email: "",
  roles: "",
  firstName: "",
  jti: "",
  exp: 0,
  iss: "",
  aud: "",
};

const initialState: IInitialState = {
  userLoginInfo: emptyUserLogInInfo,
};
const userReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: any
) => {
  switch (type) {
    case GET_USER_LOGIN_INFO: {
      return {
        ...state,
        userLoginInfo: payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
