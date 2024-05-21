/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpService } from "../../Services/authServiceApi";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ISignUpRequestModel, ISignUpResponseModel } from "../../models/authModel";
import { setTheme } from "../../store/action/themeAction";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import { LayoutConfig } from "../../types/layout";
import { validateSignUp } from "../../utils/yup";
import { LayoutContext } from "../context/layoutcontext";
import { IToastValueContext, ToastContext } from "../context/toastContext";

export default function SignupPage() {
  const InitialValues: ISignUpRequestModel = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const nav = useNavigate();
  const handleSignUp = async (detaiSignUp: ISignUpRequestModel) => {
    const res: ISignUpResponseModel = await signUpService(detaiSignUp);
    if (res) {
      if (res.baseResponse && res.baseResponse.success === true) {
        setShowModelToast({
          severity: "success",
          summary: "Success",
          detail: "Sign Up Success",
        });
        nav("/auth/login")
      }
      else if (res.baseResponse && res.baseResponse.success === false) {
        setShowModelToast({
          severity: "error",
          summary: "Error",
          detail: `${res?.baseResponse.message}`
        });
      }
      else {
        setShowModelToast({
          severity: "error",
          summary: "Error",
          detail: "Something Wrong",
        });
      }
    }

  };
  const dispatch = useAppDispatch();
  const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const { changeTheme } = useContext(PrimeReactContext);
  //  const [formValues, setFormValues] = useState<ISignUpRequestModel>(InitialValues);
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
    validationSchema: validateSignUp,
    onSubmit: (value) => {
      handleSignUp(value);
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
              Sign up to continue with App...
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="item-form mb-3">
              <label
                htmlFor="firstName"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                First Name
              </label>
              <InputText
                id="firstName"
                placeholder="First Name..."
                required
                className="w-full"
                data-pr-classname="w-full p-3 md:w-30rem"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}></InputText>
              <br />
              <div className="my-3 pl-2">
                {errors.firstName && touched.firstName && (
                  <span className="text-red-500 my-3">{errors.firstName}</span>
                )}
              </div>
            </div>
            <div className="item-form mb-3">
              <label
                htmlFor="lastName"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Last Name
              </label>
              <InputText
                id="lastName"
                placeholder="Last Name..."
                required
                className="w-full"
                data-pr-classname="w-full p-3 md:w-30rem"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}></InputText>
              <br />
              <div className="my-3 pl-2">
                {errors.lastName && touched.lastName && (
                  <span className="text-red-500 my-3">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="item-form mb-3">
              <label
                htmlFor="email"
                className="block text-900 text-sm ml-1 font-medium mb-2">
                Email
              </label>

              <InputText
                id="email"
                type="text"

                placeholder="Email..."
                className="w-full md:w-30rem"

                // defaultValue={formValues.email}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />

              <div className="my-3 pl-2">
                {errors.email && touched.email && (
                  <span className="text-red-500 my-3">{errors.email}</span>
                )}
              </div>

            </div>

            <div className="item-form mb-3">
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

            <div className="item-form mb-5">
              <label
                htmlFor="password"
                className="block text-900 font-medium text-sm ml-1 mb-2">
                Confirm Password
              </label>

              <div className="p-inputgroup flex-1">

                <InputText
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password..."
                  required
                  className="w-full"
                  data-pr-classname="w-full p-3 md:w-30rem"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}></InputText>
                <Button onClick={handleToggleShowConfirmPassword} icon={`pi ${showConfirmPassword ? 'pi-eye-slash' : 'pi-eye'}`} className="p-button" />
              </div>

              <div className="my-3 pl-2">
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="text-red-500 my-3">{errors.confirmPassword}</span>
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
                label="Sign up"
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

              <Link title="Sign in" className="pi pi-sign-in text-3xl" to={"/auth/login"}>

              </Link>

            </div>

          </form>
        </div>
      </div>
    </div >
  );
}
