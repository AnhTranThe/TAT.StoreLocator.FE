import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { ToggleButton } from "primereact/togglebutton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileAvartar from '../../../components/Common/ProfileAvartar';
import { EGenderType } from "../../../enums";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IUserSaveInfoModel } from "../../../models/authModel";
import { ISelectBoxValueModel } from "../../../models/commonModel";
import { setActiveTabMenuProfileAction } from "../../../store/action/tabAction";
import { useAppDispatch } from "../../../store/store";
import { Button } from "primereact/button";

export default function ProfileManage() {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { activeTabMenuProfileIndex }: { activeTabMenuProfileIndex: number } = useAppSelector(
        (state) => state.tabReducer
    );
    const genderOptions: ISelectBoxValueModel[] = [
        { name: 'Male', value: EGenderType.Male.toString() },
        { name: 'Female', value: EGenderType.Female.toString() },
        { name: 'Other', value: EGenderType.Other.toString() }
    ];
    const [selectedGender, setSelectedGender] = useState<EGenderType | null>(null);
    const [isActiveStatus, setIsActiveStatus] = useState<boolean>(true);

    const { userLoginInfo }: { userLoginInfo: IUserSaveInfoModel } = useAppSelector(
        (state) => state.userReducer
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
            <div className="card ">
                <TabMenu activeIndex={activeTabMenuProfileIndex} onTabChange={(e) => dispatch(setActiveTabMenuProfileAction(e.index))} model={tabMenuItems} />
            </div>
            <div className="pt-5">
                <div className="flex flex-column md:flex-row">
                    <div className="col-12 md:col-4 border-right-1 text-center ">
                        <ProfileAvartar size="xlarge" userName={userLoginInfo.email} />
                    </div>
                    <div className="col-12 md:col-8  px-4 ">
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="firstname">Firstname</label>
                                <InputText id="firstname" type="text" />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="lastname">Lastname</label>
                                <InputText id="lastname" type="text" />
                            </div>
                            <div className="field col-12 ">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" type="text" />
                            </div>
                            <div className="field col-12  md:col-6 ">
                                <label htmlFor="dob">Date of birth</label>
                                <Calendar showIcon />
                            </div>
                            <div className="field col-12  md:col-6 ">
                                <label htmlFor="gender">Gender</label>
                                <Dropdown
                                    value={selectedGender}
                                    onChange={(e) => setSelectedGender(e.value)}
                                    options={genderOptions} optionLabel="gender"

                                    placeholder="Select a gender" className="w-full " />
                            </div>
                            <div className="field col-12 md:col-6   mt-4 ">
                                <Button label="Update account" severity="help" rounded />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>


    )
}
