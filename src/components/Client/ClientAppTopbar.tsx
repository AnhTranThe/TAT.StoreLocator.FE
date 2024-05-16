/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Ripple } from "primereact/ripple";
import { Sidebar } from "primereact/sidebar";
import { StyleClass } from "primereact/styleclass";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { userRoleName } from "../../constants";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IUserSaveInfoModel } from "../../models/authModel";
import { IMenuItem } from "../../models/commonModel";
import { LayoutContext } from "../../pages/context/layoutcontext";
import { setActiveTabMenuProfileAction } from "../../store/action/tabAction";
import { setTheme } from "../../store/action/themeAction";
import { getUserLoginInfo } from "../../store/action/userAction";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import { LayoutConfig } from "../../types/layout";
import ProfileAvartar from "../Common/ProfileAvartar";



export default function ClientAppTopbar() {

  interface HeaderProps {
    isdarktheme: string;
  }

  const StyledHeader = styled.header<HeaderProps>`
   display: flex;
  z-index: 5;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  background-color:  ${(props) => (props.isdarktheme === "true" ? '#173EAD' : '#1D4ED8')};
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  height:5rem;
  `

  const emptyUserLoginInfo = {
    id: "",
    email: "",
    firstName: "",
    roles: ""
  }



  const dispatch = useAppDispatch();
  const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );

  const { activeTab }: { activeTab: string } = useAppSelector(
    (state) => state.tabReducer
  );
  const { userLoginInfo }: { userLoginInfo: IUserSaveInfoModel } = useAppSelector(
    (state) => state.userReducer
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuMobileProfileRef = useRef<any>(null);



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
  const menuProfileRef = useRef<Menu>(null);
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Token");
    dispatch(getUserLoginInfo(emptyUserLoginInfo.id, emptyUserLoginInfo.email, emptyUserLoginInfo.firstName, emptyUserLoginInfo.roles));
    nav("/auth/login");
  };

  const itemLeft: IMenuItem[] = [
    {
      template: () => {
        return (
          <Link className="text-xl font-bold flex align-items-center text-white pr-2 "
            to="/">
            <img
              alt="logo"
              src="/public/imgs/Logo/logo-white.png"
              className="h-2rem"></img>
            <label className="text-2xl pl-2 cursor-pointer">Store Locator</label>
          </Link>
        )
      },
    },
    // {
    //   template: () => {
    //     return (

    //       <Link className={`p-button p-component p-button-text text-white hover:bg-black-alpha-90  ${activeTab === "home" ? "bg-black-alpha-90" : ""}`}

    //         to="/">Home</Link>
    //     );
    //   },
    // }

  ];
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
            <img alt="logo" src={"/public/imgs/github-mark.png"} className="icon" />
          </Button>

        );

      },
    },
    {

      template: () => {
        return (
          <Button
            rounded
            onClick={() => {
              dispatch(setTheme(!isDarkTheme));
            }
            }
            icon="pi pi-sun"
            className={` circle-button ${!isDarkTheme ? "p-button-light" : "p-button-dark"}`}
          >
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
        else {
          return (
            <Link className={`bg-black-alpha-40 hover:bg-black-alpha-90 border-round text-white p-button `}
              to="/auth/login">Login or Register</Link>
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
              <a onClick={() => {
                dispatch(setActiveTabMenuProfileAction(0))
                nav("/managements/profile")
              }

              } className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                <i className="pi pi-user mr-3"></i>
                <span className="font-medium">My account</span>
                <Ripple />
              </a>
            </li>
            <li>
              <a onClick={() => {
                dispatch(setActiveTabMenuProfileAction(1))
                nav("/managements/wishlists")
              }
              }
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                <i className="pi pi-heart mr-3"></i>
                <span className="font-medium">My Wishlists</span>
                <Ripple />
              </a>
            </li>
            <li>
              <a onClick={() => {
                dispatch(setActiveTabMenuProfileAction(2))
                nav("/managements/reviews")
              }
              } className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                <i className="pi pi-comment mr-3"></i>
                <span className="font-medium">My Reviews</span>
                <Ripple />
              </a>
            </li>
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
  return (
    <>
      <StyledHeader className="mx-auto md:px-3 md:py-3 sm: px-1 sm: py-1 " isdarktheme={isDarkTheme.toString()} >
        <div className="relative flex h-3rem  align-items-center w-full ">
          {/* Content for mobile screens */}
          <div className="main-menu-mobile-mode w-full">
            <div className="absolute top-0  flex  w-full">
              <Button
                rounded
                text
                className="text-white "
                onClick={() => {
                  setIsMobileMenuOpen(prev => !prev)
                }
                }
                icon="pi pi-bars"
              >
              </Button>
            </div>
            <div className="flex flex-column justify-content-center align-items-center w-full">
              <Link className="text-xl font-bold flex align-items-center text-white pr-2 "
                to="/">
                <img
                  alt="logo"
                  src="/public/imgs/Logo/logo-white.png"
                  className="h-2rem"></img>
                <label className="text-2xl pl-2 cursor-pointer">Store Locator</label>
              </Link>
              {isMobileMenuOpen && (
                <Sidebar
                  visible={isMobileMenuOpen}
                  onHide={() => setIsMobileMenuOpen(false)}
                  content={({ closeIconRef, hide }) => (
                    <div className="flex relative h-full ">
                      <div className="surface-section w-full" >
                        <div className="flex flex-column h-full">
                          <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                            <span className="inline-flex align-items-center gap-2">
                              <img
                                alt="logo"
                                src="/public/imgs/Logo/logo-dark.png"
                                className="h-2rem"></img>
                              <span className="font-semibold text-2xl text-primary">Store Locator</span>
                            </span>
                            <span>
                              <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                            </span>
                          </div>
                          <div className="overflow-y-auto">
                            <ul className="list-none p-3 m-0">
                              <ul className="list-none p-0 mb-2 overflow-hidden ">
                                <li >
                                  <Link onClick={() => { setIsMobileMenuOpen(prev => !prev) }} to={"/"} className={`p-ripple flex align-items-center mb-2 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full  ${activeTab === "home" ? "bg-black-alpha-90 text-white" : ""} `}>

                                    <i className="pi pi-home mr-2 text-xl"></i>
                                    <span className="text-xl">Home</span>
                                    <Ripple />
                                  </Link>
                                </li>
                                {/* <li >
                                  <Link to={"/Properties"} className={`p-ripple flex align-items-center mb-2 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full ${activeTab === "properties" ? "bg-black-alpha-90 text-white" : ""}`}>

                                    <i className="pi pi-sign-in mr-2 text-xl"></i>
                                    <span className="text-xl">Properties</span>
                                    <Ripple />
                                  </Link>
                                </li> */}
                                {
                                  userLoginInfo.id && userLoginInfo.roles ? (<div className="overflow-y-auto">
                                    <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />

                                    <div className="m-3">
                                      <StyleClass nodeRef={menuMobileProfileRef} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                        <div ref={menuMobileProfileRef} className="p-ripple  flex align-items-center justify-content-between text-600 cursor-pointer">
                                          <a v-ripple className=" flex align-items-center  cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                            <ProfileAvartar size="normal" userName={userLoginInfo.firstName} />
                                            <span className="font-bold">{userLoginInfo.email}</span>
                                          </a>
                                          <i className="pi pi-chevron-down"></i>
                                          <Ripple />
                                        </div>
                                      </StyleClass>
                                      <ul className="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                          <a onClick={() => {
                                            dispatch(setActiveTabMenuProfileAction(0))
                                            nav("/managements/profile")
                                            setIsMobileMenuOpen(false)
                                          }
                                          }
                                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-user mr-3"></i>
                                            <span className="font-medium">My account</span>
                                            <Ripple />
                                          </a>
                                        </li>
                                        <li>
                                          <a onClick={() => {
                                            dispatch(setActiveTabMenuProfileAction(1))
                                            nav("/managements/wishlists")
                                            setIsMobileMenuOpen(false)
                                          }}
                                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-heart mr-3"></i>
                                            <span className="font-medium">My Wishlists</span>
                                            <Ripple />
                                          </a>
                                        </li>
                                        <li>
                                          <a onClick={() => {
                                            dispatch(setActiveTabMenuProfileAction(2))
                                            nav("/managements/reviews")
                                            setIsMobileMenuOpen(false)
                                          }}

                                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-comment mr-3"></i>
                                            <span className="font-medium">My Reviews</span>
                                            <Ripple />
                                          </a>
                                        </li>
                                        <li>
                                          <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-question mr-3"></i>
                                            <span className="font-medium">Help</span>
                                            <Ripple />
                                          </a>
                                        </li>
                                        <li>
                                          <a onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false)
                                          }}
                                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                            <i className="pi pi-sign-out mr-3"></i>
                                            <span className="font-medium">Log out</span>
                                            <Ripple />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>

                                  </div>

                                  ) : (<li >
                                    <Link to={"/auth/login"} className={`p-ripple flex align-items-center mb-2 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full bg-indigo-400 active:bg-indigo-500 text-white`}>

                                      <i className="pi pi-sign-in mr-2 text-xl"></i>
                                      <span className="text-xl">Login or Register</span>
                                      <Ripple />
                                    </Link>
                                  </li>)

                                }


                              </ul>
                            </ul>
                          </div>

                          <div className="overflow-y-auto">
                            <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                            <div className="m-3 flex justify-content-center gap-3 align-items-center">
                              <label>Light</label>
                              <InputSwitch checked={isDarkTheme as boolean} onChange={() => dispatch(setTheme(!isDarkTheme))}></InputSwitch>
                              <label>Dark</label>

                            </div>


                          </div>
                          <div className="m-3 flex justify-content-center   align-items-center">

                            <span className="mr-2">  Make by</span>

                            <a href="https://github.com/AnhTranThe/">
                              <span className="mr-2">The Anh</span>
                              <i className="pi pi-heart-fill" style={{ color: 'slateblue' }}></i>

                            </a>

                          </div>


                        </div>
                      </div>
                    </div>
                  )}
                ></Sidebar>
              )



              }

            </div>


          </div>
          {/* Content for desktop screens */}
          <div className="main-menu-desktop-mode w-full  ">
            <div className=" flex justify-content-between w-full mx-auto col-10 ">
              <div className=" flex align-items-center gap-2  ">
                {itemLeft.map((item, index) => (
                  <div key={index}>
                    {item.template && item.template()} {/* Render the template function later */}
                  </div>
                ))}
              </div>

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
        </div>
      </StyledHeader>
    </>
  );
}
