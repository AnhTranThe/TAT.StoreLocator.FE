import { useFormik } from "formik";
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminRoleName } from "../../constants";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ILoginRequestModel, ILoginResponseModel, IUserSaveInfoModel } from "../../models/authModel";
import { loginService } from "../../Services/authServiceApi";
import { setTheme } from "../../store/action/themeAction";
import { getUserLoginInfo } from "../../store/action/userAction";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import { LayoutConfig } from "../../types/layout";
import { decodeJwtToken } from "../../utils/Utilities";
import { validateSignIn } from '../../utils/yup';
import { LayoutContext } from "../context/layoutcontext";
import { IToastValueContext, ToastContext } from "../context/toastContext";

const LoginPage = () => {
  const InitialValues: ILoginRequestModel = {
    emailOrUserName: "",
    password: "",
  }
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSignIn = async (request: ILoginRequestModel) => {
    if (request.emailOrUserName && request.password) {
      const data: ILoginResponseModel = await loginService(request);
      if (data) {
        const decodeAccessToken = decodeJwtToken(data.token) as IUserSaveInfoModel;
        dispatch(getUserLoginInfo(decodeAccessToken.id, decodeAccessToken.email, decodeAccessToken.firstName, decodeAccessToken.roles))
        localStorage.setItem("Token", JSON.stringify(data));
        if (decodeAccessToken.roles === adminRoleName) {
          navigate("/admin");
        } else {
          navigate("/");
        }
        setShowModelToast((pre) => {
          return {
            ...pre,
            severity: "success",
            summary: "Success",
            detail: "Login Success",
          };
        });
        return;
      } else {
        setShowModelToast((pre) => {
          return {
            ...pre,
            severity: "warn",
            summary: "Warning",
            detail: "Name or Email not exsisted",
          };
        });
        return;
      }
    } else {
      setShowModelToast((pre) => {
        return {
          ...pre,
          severity: "info",
          summary: "Warning",
          detail: "Pls! fill Email and Password",
        };
      });
      return;
    }
  };
  const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const { changeTheme } = useContext(PrimeReactContext);
  const _changeTheme = (theme: string, colorScheme: string) => {
    changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
      setLayoutConfig((prevState: LayoutConfig) => ({
        ...prevState,
        theme,
        colorScheme,
      }));
    });
  };
  useEffect(() => {
    isDarkTheme
      ? _changeTheme("soho-dark", "dark")
      : _changeTheme("soho-light", "light");
  }, [isDarkTheme]);
  const { values, setValues, handleChange, handleBlur, handleSubmit, errors, touched, setErrors, setTouched } = useFormik({

    initialValues: InitialValues,
    validationSchema: validateSignIn,
    onSubmit: (value) => {
      handleSignIn(value);
    },
  });


  return (
    <div className="flex flex-column align-items-center justify-content-center Signup ">
      <div
        style={{
          borderRadius: "56px",
          padding: "0.3rem",
          background:
            "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
        }}>
        <div
          className="w-full surface-card py-4 px-5 sm:px-8 "
          style={{ borderRadius: "53px" }}>
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Welcome!!</div>
            <span className="text-600 font-medium">
              Sign in to continue with App...
            </span>
          </div>

          <form onSubmit={handleSubmit}>


            <div className="item-form mb-3">
              <label
                htmlFor="emailOrUserName"
                className="block text-900 text-sm ml-1 font-medium mb-2">
                Email or Username
              </label>

              <InputText
                id="emailOrUserName"
                type="text"
                placeholder="Email or Username..."
                className="w-full md:w-30rem"
                value={values.emailOrUserName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />

              <div className="my-3 pl-2">
                {errors.emailOrUserName && touched.emailOrUserName && (
                  <span className="text-red-500 my-3">{errors.emailOrUserName}</span>
                )}
              </div>

            </div>

            <div className="item-form mb-5">
              <label
                htmlFor="password"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Password
              </label>

              <div className="p-inputgroup flex-1">

                <InputText
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password..."
                  required
                  className="w-full"
                  data-pr-classname="w-full p-3 md:w-30rem"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}></InputText>
                <Button onClick={handleToggleShowPassword} icon={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`} className="p-button" />
              </div>

              <div className="my-3 pl-2">
                {errors.password && touched.password && (
                  <span className="text-red-500 my-3">{errors.password}</span>
                )}
              </div>

            </div>

            <div className="flex gap-2 mb-5">
              <Button
                onClick={() => {
                  setValues(InitialValues)
                  setErrors({})
                  setTouched({})
                }}
                label="Clear"
                severity="warning"
                className="w-full p-3 text-xl">

              </Button>
              <Button
                type="submit"
                label="Sign In"
                className="w-full p-3 text-xl"></Button>
            </div>
            <div className="m-3 flex justify-content-between gap-3 align-items-center">
              <Link title="Go home" className="pi pi-home text-3xl" to={"/"}>

              </Link>
              <a title="Change theme"
                onClick={() => dispatch(setTheme(!isDarkTheme))}
                className={`pi cursor-pointer text-3xl ${isDarkTheme ? 'pi-moon' : 'pi-sun'}`}
              >
              </a>

              <Link title="Sign up" className="pi pi-user-plus text-3xl" to={"/auth/signup"}>

              </Link>

            </div>

          </form>
        </div>
      </div>
    </div >
  );
};

export default LoginPage;
