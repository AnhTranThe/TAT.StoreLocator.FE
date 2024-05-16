import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { setActiveTabMenuProfileAction } from "../../../store/action/tabAction";
import { useAppDispatch } from "../../../store/store";

export default function WishlistManage() {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { activeTabMenuProfileIndex }: { activeTabMenuProfileIndex: number } = useAppSelector(
        (state) => state.tabReducer
    );
    const tabMenuItems: MenuItem[] = [
        {
            label: 'Account info',
            icon: 'pi pi-user',
            command: () => {
                dispatch(setActiveTabMenuProfileAction(0))
                nav("/managements/profile")
            }
        },
        {
            label: 'Wishlist',
            icon: 'pi pi-heart',
            command: () => {
                dispatch(setActiveTabMenuProfileAction(1))
                nav("/managements/wishlists")
            }
        },
        {
            label: 'Reviews',
            icon: 'pi pi-comments',
            command: () => {
                dispatch(setActiveTabMenuProfileAction(2))
                nav("/managements/reviews")
            }
        },
    ];
    return (
        <>
            <div className="card">
                <TabMenu activeIndex={activeTabMenuProfileIndex} onTabChange={(e) => dispatch(setActiveTabMenuProfileAction(e.index))} model={tabMenuItems} />
                <div>
                    <h1>
                        WishlistManage
                    </h1>
                </div>
            </div>

        </>
    )
}
