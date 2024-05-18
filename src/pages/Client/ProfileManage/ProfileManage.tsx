import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import ProfileAvartar from '../../../components/Common/ProfileAvartar';
import { EGenderType } from "../../../enums";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IUserSaveInfoModel } from "../../../models/authModel";
import { ISelectBoxValueModel } from "../../../models/commonModel";

export default function ProfileManage() {

    const genderOptions: ISelectBoxValueModel[] = [
        { name: 'Male', value: EGenderType.Male.toString() },
        { name: 'Female', value: EGenderType.Female.toString() },
        { name: 'Other', value: EGenderType.Other.toString() }
    ];
    const [selectedGender, setSelectedGender] = useState<EGenderType | null>(null);

    const { userLoginInfo }: { userLoginInfo: IUserSaveInfoModel } = useAppSelector(
        (state) => state.userReducer
    );

    return (
        <>
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
        </>


    )
}
