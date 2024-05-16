/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getListDistrictsService, getListProvincesService, getListWardsService } from "../../../Services/addressServiceApi";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { ISelectBoxValueModel } from "../../../models/commonModel";
import { IOApiDistrictModel, IOApiProvinceModel, IOApiWardModel } from '../../../models/oApiModel';
import { IThemeReducer } from "../../../store/reducer/themeReducer";

export default function HomeSearch() {
    interface ISectionProps {
        isdarktheme: string;
    }
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );
    const sampleCategories: ISelectBoxValueModel[] = [
        { name: 'New York', value: 'NY' },
        { name: 'Rome', value: 'RM' },
        { name: 'London', value: 'LDN' },
        { name: 'Istanbul', value: 'IST' },
        { name: 'Paris', value: 'PRS' }
    ];




    const StyledSection = styled.header<ISectionProps>`
    display: flex;
    z-index: 5;
    position: relative;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => (props.isdarktheme === "true" ? "#173EAD" : "#1D4ED8")};
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
  `;
    const searchInputRef = useRef<HTMLInputElement>(null);
    // const [selectSearchOps, setSelectSearchOps] = useState("product");
    const [selectProvinceOp, setSelectProvinceOp] = useState<number>(0);
    const [selectDistrictOp, setSelectDistrictOp] = useState<number>(0);
    const [selectWardOp, setSelectWardOp] = useState<number>(0);
    const [selectCategoriesOps, setSelectCategoriesOps] = useState<string[]>([]);
    const [listProvincesOps, setListProvincesOps] = useState<ISelectBoxValueModel[]>([]);
    const [listDistrictOps, setListDistrictOps] = useState<ISelectBoxValueModel[]>([]);
    const [listWardOps, setListWardOps] = useState<ISelectBoxValueModel[]>([]);
    const selectedFilterDropDownTemplate = (option: ISelectBoxValueModel, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };
    const filterDropDownOptionTemplate = (option: ISelectBoxValueModel) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    const handleClearSearch = () => {
        //  setSelectSearchOps("product");
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
    }

    const handleSeachSubmit = () => {
        console.log(searchInputRef.current?.value);
    }
    const handleGetListProvinces = async () => {
        setListProvincesOps([]);
        const res: IOApiProvinceModel = await getListProvincesService();
        setListProvincesOps((prevList) => [
            ...prevList,
            ...res.data.map((item) => ({
                name: item.name,
                value: item.id
            }))
        ]);
    };
    const handleGetListDistricts = async (provinceId: number) => {
        setListDistrictOps([]);
        const res: IOApiDistrictModel = await getListDistrictsService(provinceId);
        setListDistrictOps((prevList) => [
            ...prevList,
            ...res.data.map((item) => ({
                name: item.name,
                value: item.id
            }))
        ]);

    };
    const handleGetListWards = async (districtId: number) => {
        setListWardOps([]);
        const res: IOApiWardModel = await getListWardsService(districtId);
        setListWardOps((prevList) => [
            ...prevList,
            ...res.data.map((item) => ({
                name: item.name,
                value: item.id
            }))
        ]);
    };

    useEffect(() => {
        handleGetListProvinces();
    }, [])
    return (
        <StyledSection isdarktheme={isDarkTheme.toString()}>
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-column justify-content-center">
                <div className="text-center pt-8">
                    <h1
                        style={{ fontWeight: "800" }}
                        className=" text-white sm:text-5xl md:text-7xl"
                    >
                        Find Retail Store
                    </h1>
                    <p className="my-4 sm:text-xl md:text-3xl text-white">
                        Discover the perfect property that suits your needs.
                    </p>
                </div>
                <div className="mt-3 mx-auto w-full mb-8 grid ">
                    <div className="md:col-10 mx-auto">
                        <div className=" w-full flex flex-column md:flex-row justify-content-center mb-3">
                            <div className=" md:pr-2 mb-4 md:mb-0 md:col-8 col-12">
                                <input
                                    className={`p-inputtext p-component w-full `}
                                    type="text"
                                    placeholder={"Find Retail Store"}
                                    ref={searchInputRef}

                                    style={{ transition: 'width 0.3s ease-in-out' }}
                                />
                            </div>
                            <div className="flex jus md:col-4 col-12 md:gap-3 gap-2  ">
                                {/* <div className="field-radiobutton m-0 ">
                                    <RadioButton
                                        inputId="option1"
                                        name="option"
                                        value="product"
                                        checked={selectSearchOps === "product"}
                                        onChange={(e) => setSelectSearchOps(e.value)}
                                    />
                                    <label className="text-white font-bold " htmlFor="option1">Search Product</label>
                                </div>
                                <div className="field-radiobutton m-0">
                                    <RadioButton
                                        inputId="option2"
                                        name="option"
                                        value="store"
                                        checked={selectSearchOps === "store"}
                                        onChange={(e) => setSelectSearchOps(e.value)}
                                    />
                                    <label className="text-white font-bold" htmlFor="option2">Search Store</label>
                                </div> */}
                                <MultiSelect value={selectCategoriesOps} onChange={(e) => setSelectCategoriesOps(e.value)} options={sampleCategories} optionLabel="name"
                                    filter placeholder="Select Categories" maxSelectedLabels={3} className="w-full" />
                            </div>
                        </div>
                        <div className="mx-auto w-full flex flex-column md:flex-row justify-content-center">
                            <div className=" md:pr-2 mb-4 md:mb-0  md:col-4 col-12  ">
                                <Dropdown className="w-full"
                                    value={selectProvinceOp} onChange={(e) => {
                                        setSelectProvinceOp(e.value);
                                        handleGetListDistricts(e.value);
                                    }}
                                    options={listProvincesOps}
                                    optionLabel="name" placeholder="Select Province"
                                    filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate} />
                            </div>
                            <div className="md:pr-2 mb-4 md:mb-0  md:col-4 col-12  ">
                                <Dropdown className="w-full"
                                    value={selectDistrictOp}
                                    onChange={(e) => {
                                        setSelectDistrictOp(e.value);
                                        handleGetListWards(e.value);
                                    }

                                    }
                                    options={listDistrictOps}
                                    optionLabel="name"
                                    placeholder="Select District"
                                    filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate}

                                />
                            </div>
                            <div className="md:pr-2 mb-4 md:mb-0  md:col-4 col-12  ">
                                <Dropdown className="w-full"
                                    value={selectWardOp}
                                    onChange={(e) => {
                                        setSelectWardOp(e.value);
                                    }}
                                    options={listWardOps}
                                    optionLabel="name"
                                    placeholder="Select Ward"
                                    filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate}
                                />
                            </div>
                        </div>
                        <div className="mx-auto w-full flex justify-content-center gap-2 md:py-3">
                            <div className="md:pr-2 mb-4 md:mb-0    ">

                                <Button onClick={handleSeachSubmit} severity="success" label="Search"></Button>
                            </div>
                            <div className="md:pr-2 mb-4 md:mb-0    ">

                                <Button onClick={handleClearSearch} severity="warning" label="Clear"></Button>
                            </div>



                        </div>
                    </div>



                </div>
            </div>
        </StyledSection>
    );
}
