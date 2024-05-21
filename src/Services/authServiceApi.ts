/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginRequestModel, ISignUpRequestModel } from "../models/authModel";
import axiosInstance from "./configAxiosService";

export const loginService = async (request: ILoginRequestModel) => {
  try {
    const res = await axiosInstance.post("/authentication/login", request);
    console.log("res", res);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const signUpService = async (request: ISignUpRequestModel) => {
  try {
    const res = await axiosInstance.post("/authentication/register", request);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
