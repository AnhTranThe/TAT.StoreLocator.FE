import { IBaseResponseModel } from "./commonModel";
import { IUserResponseModel } from "./userModel";

export interface ILoginRequestModel {
  emailOrUserName: string;
  password: string;
}
export interface ILoginResponseModel {
  token: string;
  refreshToken: string;
}

export interface ISignUpRequestModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
export interface ISignUpResponseModel {
  baseResponse: IBaseResponseModel;
  userResponseModel: IUserResponseModel;
}

export interface IUserSaveInfoModel {
  id: string;
  email: string;
  firstName: string;
  roles: string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
}
