import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { adminRoleName } from "../../constants";
import {
  IToastValueContext,
  ToastContext,
} from "../../pages/context/toastContext";
import { decodeJwtToken } from "../../utils/Utilities";
import { IUserSaveInfoModel } from "../../models/authModel";
import { useAppDispatch } from "../../store/store";
import { getUserLoginInfo } from "../../store/action/userAction";

interface IUserPrivateRouteProps {
  children: React.ReactNode;
}
const emptyUserLoginInfo = {
  id: "",
  email: "",
  firstName: "",
  roles: "",
};
export default function AdminPrivateRoute({
  children,
}: IUserPrivateRouteProps) {
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const data = JSON.parse(localStorage.getItem("Token")!);
  const nav = useNavigate()
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!data) {
      nav("/")
      dispatch(
        getUserLoginInfo(
          emptyUserLoginInfo.id,
          emptyUserLoginInfo.email,
          emptyUserLoginInfo.firstName,
          emptyUserLoginInfo.roles
        )
      );
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "Pls!! Login to access admin page",
      }));
    }
    if (data) {
      const decodeAccessToken = decodeJwtToken(data.token) as IUserSaveInfoModel;
      if (decodeAccessToken.roles !== adminRoleName) {
        nav("/")
        setShowModelToast((pre) => ({
          ...pre,
          severity: "warn",
          summary: "Warning",
          detail: "User cannot go to page Admin",
        }));

      }

    }
    else {


      <Navigate to={"/auth/login"} />
    }
  }, []);


  return <>{children}</>;
}
