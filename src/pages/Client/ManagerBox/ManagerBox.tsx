import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IUserSaveInfoModel } from "../../../models/authModel";
import { setActiveTabMenuProfileAction } from "../../../store/action/tabAction";
import { useAppDispatch } from "../../../store/store";

export default function ManagementBox() {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { activeTabMenuProfileIndex }: { activeTabMenuProfileIndex: number } = useAppSelector(
        (state) => state.tabReducer
    );
    const { userLoginInfo }: { userLoginInfo: IUserSaveInfoModel } = useAppSelector(
        (state) => state.userReducer
    );
    const tabMenuItems: MenuItem[] = [
        {
            label: 'Account info',
            icon: 'pi pi-user',
            command: () => {
                dispatch(setActiveTabMenuProfileAction(0))
                nav(`/management/${userLoginInfo.id}/profile`)
            }
        },
    ];

    return (
        <>
            <div className="card ">
                <TabMenu activeIndex={activeTabMenuProfileIndex} onTabChange={(e) => dispatch(setActiveTabMenuProfileAction(e.index))} model={tabMenuItems} />
            </div>
            <div className="pt-5">
                <Outlet />
            </div>

        </>
    )
}
