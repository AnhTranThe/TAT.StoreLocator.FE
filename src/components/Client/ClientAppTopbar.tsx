/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrimeReactContext } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useAppSelector } from "../../hooks/ReduxHook";
import { IMenuItem } from "../../models/commonModel";
import { IUserLogInInfoModel } from "../../models/userModel";
import { LayoutContext } from "../../pages/context/layoutcontext";
import { setTheme } from "../../store/action/themeAction";
import { IThemeReducer } from "../../store/reducer/themeReducer";
import { useAppDispatch } from "../../store/store";
import { LayoutConfig } from "../../types/layout";


export default function ClientAppTopbar() {

  interface HeaderProps {
    IsDarkTheme: boolean;
  }
  interface ButtonNavProps {
    activeTab: string;
  }
  const StyledHeader = styled.header<HeaderProps>`
   display: flex;
  z-index: 5;
  position: relative;
  width: 100%;
  padding: 1rem 2.5rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color:  ${(props) => (props.IsDarkTheme ? '#173EAD' : '#1D4ED8')};
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  `
  const StyledButton = styled.button<ButtonNavProps>`
  background: ${(props) => (props.activeTab == "home" ? 'black' : 'none')};
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: black;
  }
`;

  const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
  position: relative;
  transition: color 0.3s;
  background-color: transparent;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &.active-link {
    background-color: black;
    border-radius: 10px;
  }

  &:hover {
    
    background-color: black;
    border-radius: 10px;
  }
`;
  const dispatch = useAppDispatch();
  const { IsDarkTheme }: { IsDarkTheme: boolean } = useAppSelector(
    (state: IThemeReducer) => state.themeReducer
  );
  const { activeTab }: { activeTab: string } = useAppSelector(
    (state) => state.tabReducer
  );
  const { userLoginInfo }: { userLoginInfo: IUserLogInInfoModel } = useAppSelector(
    (state) => state.userReducer
  );

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
    IsDarkTheme
      ? _changeTheme("soho-dark", "dark")
      : _changeTheme("soho-light", "light");
  }, [IsDarkTheme]);
  const menuRef = useRef<Menu>(null);
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Token");
    nav("/auth/login");
  };
  const handleProfileButtonClick = (event: any) => {
    setProfileDropdownOpen(!profileDropdownOpen);
    menuRef.current?.toggle(event);
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
    {
      template: () => {
        return (

          <StyledLink className={`  ${activeTab === "home" ? "active-link" : ""}`}

            to="/">Home</StyledLink>
        );
      },
    },
    {
      template: () => {
        return (

          <StyledLink className={`${activeTab === "properties" ? "active-link" : ""}`}

            to="/Properties">Properties</StyledLink>
        );
      },
    }



  ];
  const itemRights: IMenuItem[] = [
    {
      label: "Github",
      icon: "/public/imgs/github-mark.png",
      class: `circle-button ${!IsDarkTheme ? "p-button-light" : ""}`,
      command: () => {
        window.open(
          "https://github.com/AnhTranThe/FA.Project-Management",
          "_blank"
        );
      },
    },
    {
      class: `circle-button  pi ${!IsDarkTheme ? "pi-sun p-button-light" : "pi-sun p-button-dark"
        }`,
      command: () => {
        dispatch(setTheme(!IsDarkTheme));
      },
    },
    {
      class: `circle-button  pi ${!IsDarkTheme ? "pi-user p-button-light" : "pi-user p-button-dark"
        }`,
      command: handleProfileButtonClick,
      items: [
        {
          label: "Log out",
          icon: "pi pi-fw pi-sign-out",
        },
      ],
    },
  ];
  const profileMenuItems: MenuItem[] = [
    {
      template: () => {
        return (
          <div className="flex justify-content-center align-items-center text-xl">
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
              size="xlarge"
              className="mr-2"
              shape="circle"
            />
            <div className="flex flex-column align">
              <span className="font-bold">{userLoginInfo.email}</span>
              <span className="text-sm">
                {userLoginInfo.role !== 1 ? "customer" : "admin"}
              </span>
            </div>
          </div>
        );
      },
    },

    {
      template: () => {
        return (
          <Button
            onClick={handleLogout}
            className="w-full mt-3"
            icon="pi pi-fw pi-sign-out"
            label="Log out"
            severity="danger"
          />

        );
      },
    },
  ];


  return (
    <>
      <StyledHeader IsDarkTheme={IsDarkTheme} >
        <div className="flex align-items-center gap-2">
          {itemLeft.map((item, index) => (
            <div key={index}>
              {item.template && item.template()} {/* Render the template function later */}
            </div>








          ))}
        </div>
        <div className="flex gap-3">
          {itemRights.map((item, index) => (
            <Button
              key={index}
              onClick={item.command}
              className={item.class}
              aria-label={item.label}
              severity="secondary">
              {item.icon && <img alt="logo" src={item.icon} className="icon" />}
              {item.label && (
                <label className="text-xl text-white">{item.label}</label>
              )}
            </Button>
          ))}

          <Menu
            className="w-auto p-3 mt-3 surface-card"
            style={{ boxShadow: '0 1px 10px #818CF8' }}
            model={profileMenuItems}
            popup
            ref={menuRef}
          />
        </div>
      </StyledHeader>
    </>
  );
}
