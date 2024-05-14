import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { adminRoleName } from "../../constants";
import {
  IToastValueContext,
  ToastContext,
} from "../../pages/context/toastContext";
import { decodeJwtToken } from "../../utils/Utilities";
import { IUserSaveInfoModel } from "../../models/authModel";

interface IUserPrivateRouteProps {
  children: React.ReactNode;
}
export default function AdminPrivateRoute({
  children,
}: IUserPrivateRouteProps) {
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const data = JSON.parse(localStorage.getItem("Token")!);
  useEffect(() => {
    if (!data) {
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "Pls!! Login",
      }));
    }
    console.log("data", data);

    if (data) {
      const decodeAccessToken = decodeJwtToken(data.token) as IUserSaveInfoModel;
      if (decodeAccessToken.roles !== adminRoleName) {
        setShowModelToast((pre) => ({
          ...pre,
          severity: "warn",
          summary: "Warning",
          detail: "User cannot go to page Admin",
        }));
        <Navigate to={"/"} />
      }

    }
    else {
      <Navigate to={"/auth/login"} />
    }
  }, []);


  return <>{children}</>;
}
