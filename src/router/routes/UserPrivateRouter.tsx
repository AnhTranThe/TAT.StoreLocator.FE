import { useContext, useEffect } from "react";
import { IToastValueContext, ToastContext } from "../../pages/context/toastContext";
import { Navigate } from "react-router-dom";

interface IUserPrivateRouteProps {
  children: React.ReactNode;
}
export default function UserPrivateRoute({ children }: IUserPrivateRouteProps) {
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);

  const loginDetail = JSON.parse(localStorage.getItem("Token")!);

  useEffect(() => {
    if (!loginDetail) {
      setShowModelToast((pre) => ({
        ...pre,
        severity: "warn",
        summary: "Warning",
        detail: "Pls!! Login",
      }));
    }
  }, []);

  if (!loginDetail) {
    return <Navigate to={"/auth/login"} />;
  }

  return <>{children}</>;
}
