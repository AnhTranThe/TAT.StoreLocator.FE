import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRoleName } from "../../constants";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IUserSaveInfoModel } from "../../models/authModel";
import { IMenuItem } from "../../models/commonModel";
import { LayoutContext } from "../../pages/context/layoutcontext";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import ProfileAvartar from "../Common/ProfileAvartar";
import { getUserLoginInfo } from "../../store/action/userAction";
const emptyUserLoginInfo = {
  id: "",
  email: "",
  firstName: "",
  roles: ""
}
const AppTopbar = forwardRef((_props, ref) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch()
  const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );
  const { userLoginInfo }: { userLoginInfo: IUserSaveInfoModel } = useAppSelector(
    (state) => state.userReducer
  );
  const { layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));
  const menuProfileRef = useRef<Menu>(null);
  const itemRights: IMenuItem[] = [
    {
      template: () => {

        return (

          <Button
            onClick={() => {
              window.open(
                "https://github.com/AnhTranThe/FA.Project-Management",
                "_blank"
              );
            }}
            className={`circle-button ${!isDarkTheme ? "p-button-light" : ""}`}

          >
            <img alt="logo" src={"/imgs/github-mark.png"} className="icon" />
          </Button>

        );

      },
    },

    {
      template: () => {

        if (userLoginInfo.id && userLoginInfo.roles) {

          return (
            <Button onClick={(e) => { menuProfileRef.current?.toggle(e) }} className={`bg-black-alpha-40 hover:bg-black-alpha-90 border-round text-white`}
            >
              <ProfileAvartar size="normal" userName={userLoginInfo.firstName} />
              {userLoginInfo.email}</Button>

          );
        }

      },
    },
  ];
  const profileMenuItems: MenuItem[] = [
    {
      template: () => {
        return (
          <div className="flex justify-content-center align-items-center text-xl">
            <ProfileAvartar size="normal" userName={userLoginInfo.firstName} />
            <div className="flex flex-column align">
              <span className="font-bold">{userLoginInfo.email}</span>
              <span className="text-sm">
                {userLoginInfo.roles === userRoleName ? "customer" : "admin"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      separator: true
    },
    {
      template: () => {
        return (
          <ul className="list-none p-0 m-0 overflow-hidden">
            <li>
              <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                <i className="pi pi-question mr-3"></i>
                <span className="font-medium">Help</span>
                <Ripple />
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                <i className="pi pi-sign-out mr-3"></i>
                <span className="font-medium">Log out</span>
                <Ripple />
              </a>
            </li>
          </ul>
        );
      },
    },

  ];

  const handleLogout = () => {
    localStorage.removeItem("Token");
    dispatch(getUserLoginInfo(emptyUserLoginInfo.id, emptyUserLoginInfo.email, emptyUserLoginInfo.firstName, emptyUserLoginInfo.roles));
    nav("/")
  };

  return (
    <div className="layout-topbar">
      <div className="flex">

        <Link className="text-xl font-bold flex align-items-center text-white pr-2 "
          to="/admin">
          <img
            alt="logo"
            src="/imgs/Logo/logo-white.png"
            className="h-2rem"></img>
          <label className="text-2xl pl-2 cursor-pointer">Store Locator</label>
        </Link>

        <button
          ref={menubuttonRef}
          type="button"
          className="p-link layout-menu-button layout-topbar-button"
          onClick={onMenuToggle}>
          <i className="pi pi-bars" />
        </button>
      </div>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}>
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}>

        <div className=" flex align-items-center gap-3 ">
          {itemRights.map((item, index) => (
            <div key={index}>
              {item.template && item.template()} {/* Render the template function later */}
            </div>
          ))}
          <Menu
            className="w-auto p-3 mt-3 surface-card "
            style={{ boxShadow: '0 1px 10px #818CF8' }}
            model={profileMenuItems}
            popup
            ref={menuProfileRef}

          />

        </div>
      </div>
    </div>
  );
});

export default AppTopbar;
