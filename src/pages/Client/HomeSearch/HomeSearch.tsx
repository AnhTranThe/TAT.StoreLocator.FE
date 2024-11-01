/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getListDistrictsService, getListProvincesService, getListWardsService } from "../../../Services/addressServiceApi";
import { getListParentCategoryService } from "../../../Services/categoryServiceApi";
import { getReverseGeocodingService } from "../../../Services/locationServiceApi";
import { getListNearStoreService } from "../../../Services/storeServiceApi";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IGeolocation } from "../../../models/addressModel";
import { ICategoryModel } from "../../../models/categoryModel";
import { ISelectBoxValueModel } from "../../../models/commonModel";
import { IReverseGeolocationResponseModel } from "../../../models/locationModel";
import { IOApiDistrictData, IOApiProvinceData, IOApiWardData } from '../../../models/oApiModel';
import { IPaginationRequestModel } from "../../../models/paginationModel";
import { IStoreGetNearRequestModel, IStorePaginationResponseModel } from "../../../models/storeModel";
import { getListNearStoreAction } from "../../../store/action/storeAction";
import { IThemeReducer } from "../../../store/reducer/themeReducer";
import { useAppDispatch } from "../../../store/store";
import { IToastValueContext, ToastContext } from "../../context/toastContext";

const emptyStoreGetNearRequest: IStoreGetNearRequestModel = {
    district: "",
    ward: "",
    province: "",
    keyWord: "",
    categories: ""
}
const pagingAllListRequest: IPaginationRequestModel = {
    pageSize: 10000,
    pageIndex: 1,
}

const emptyListStoresNear: IStorePaginationResponseModel = {
    pageSize: 10,
    pageIndex: 1,
    totalCount: 0,
    totalPageCount: 0,
    searchTerm: "",
    data: [],
};

export default function HomeSearch() {
    interface ISectionProps {
        isdarktheme: string;
    }
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );

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
    const [detailStoreGetNearRequest, setDetailStoreGetNearRequest] = useState<IStoreGetNearRequestModel>(emptyStoreGetNearRequest);
    const [selectProvinceOp, setSelectProvinceOp] = useState<number>(0);
    const [selectDistrictOp, setSelectDistrictOp] = useState<number>(0);
    const [selectWardOp, setSelectWardOp] = useState<number>(0);
    const [selectCategoriesOps, setSelectCategoriesOps] = useState<string[]>([]);
    const [listProvincesOps, setListProvincesOps] = useState<ISelectBoxValueModel[]>([]);
    const [listDistrictOps, setListDistrictOps] = useState<ISelectBoxValueModel[]>([]);
    const [listCategoriesOps, setListCategoriesOps] = useState<ISelectBoxValueModel[]>([]);
    const [listWardOps, setListWardOps] = useState<ISelectBoxValueModel[]>([]);
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const dispatch = useAppDispatch();
    // console.log(detailStoreGetNearRequest);
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
        if (selectDistrictOp) {
            setSelectDistrictOp(0)
        }
        if (selectProvinceOp) {
            setSelectProvinceOp(0)
        }
        if (selectWardOp) {
            setSelectWardOp(0)
        }
        setDetailStoreGetNearRequest(emptyStoreGetNearRequest)
        dispatch(getListNearStoreAction(emptyListStoresNear))
    }
    const handleSearchSubmit = async () => {
        let request: IStoreGetNearRequestModel;
        const currentLocation: IGeolocation = JSON.parse(localStorage.getItem("currentLocation")!);
        if (searchInputRef.current && searchInputRef.current.value.length > 0) {
            const searchValue = searchInputRef.current.value;
            const pagingRequest: IPaginationRequestModel = {
                pageIndex: 1,
                pageSize: 10000000,
            };
            // Check if current location is available and no detailStoreGetNearRequest data
            if (detailStoreGetNearRequest.province.length > 0 ||
                detailStoreGetNearRequest.district.length > 0 ||
                detailStoreGetNearRequest.ward.length > 0) {
                request = {
                    province: detailStoreGetNearRequest.province,
                    district: detailStoreGetNearRequest.district,
                    ward: detailStoreGetNearRequest.ward,
                    keyWord: searchValue,
                    categories: detailStoreGetNearRequest.categories
                };
                const res: IStorePaginationResponseModel = await getListNearStoreService(request, pagingRequest)

                res.data && dispatch(getListNearStoreAction(res))
            }
            else if (detailStoreGetNearRequest.province.length == 0 &&
                detailStoreGetNearRequest.district.length == 0 &&
                detailStoreGetNearRequest.ward.length == 0
            ) {
                if (currentLocation) {



                    const { latitude, longitude } = currentLocation;


                    const responseGeolocation: IReverseGeolocationResponseModel = latitude && longitude && await getReverseGeocodingService({ latitude, longitude });
                    request = {
                        province: responseGeolocation.address.city,
                        district: responseGeolocation.address.suburb,
                        ward: responseGeolocation.address.quarter,
                        keyWord: searchValue,
                        categories: detailStoreGetNearRequest.categories
                    };



                    const res: IStorePaginationResponseModel = await getListNearStoreService(request, pagingRequest)
                    res.data && dispatch(getListNearStoreAction(res))

                }
                else {
                    setShowModelToast({
                        severity: "error",
                        summary: "Error",
                        detail: "Current location unidentified",
                    });
                }
            }
            else {
                setShowModelToast({
                    severity: "error",
                    summary: "Error",
                    detail: "Make sure filter have value",
                });

            }


            // Additional conditions can be added as needed
        } else {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Search value can't empty",
            });
            dispatch(getListNearStoreAction(emptyListStoresNear))

        }
    };
    const handleGetListProvinces = async () => {
        setListProvincesOps([]);
        try {
            const res = await getListProvincesService();

            if (res && res.data) {
                setListProvincesOps(res.data.map((item: IOApiProvinceData) => ({
                    name: item.ProvinceName,
                    value: item.ProvinceID
                })));
            } else {
                console.error("Response data is undefined or null for provinces.");
            }
        } catch (error) {
            console.error("Error fetching provinces: ", error);
        }
    };
    const handleGetListCategories = async () => {

        try {
            const res = await getListParentCategoryService(pagingAllListRequest);
            if (res && res.data) {
                setListCategoriesOps((prevList) => [
                    ...prevList,
                    ...res.data.map((item: ICategoryModel) => ({
                        name: item.name,
                        value: item.id
                    }))
                ]);
            } else {
                console.error("Response data is undefined or null.");
            }
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }

    }

    const handleGetListDistricts = async (provinceId: number) => {
        setListDistrictOps([]);
        try {
            const res = await getListDistrictsService(provinceId);
            if (res && res.data) {
                setListDistrictOps(res.data.map((item: IOApiDistrictData) => ({
                    name: item.DistrictName,
                    value: item.DistrictID
                })));
            } else {
                console.error("Response data is undefined or null for districts.");
            }
        } catch (error) {
            console.error("Error fetching districts: ", error);
        }
    };
    const handleGetListWards = async (districtId: number) => {
        setListWardOps([]);
        try {
            const res = await getListWardsService(districtId);
            if (res && res.data) {
                setListWardOps(res.data.map((item: IOApiWardData) => ({
                    name: item.WardName,
                    value: item.WardCode
                })));
            } else {
                console.error("Response data is undefined or null for wards.");
            }
        } catch (error) {
            console.error("Error fetching wards: ", error);
        }
    };
    useEffect(() => {
        (async () => {
            handleGetListProvinces();
            handleGetListCategories();
        })()
    }, [])
    // useEffect(() => {
    //     setListCategoriesOps
    // }, [])
    return (
        <StyledSection isdarktheme={isDarkTheme ? isDarkTheme.toString() : "false"}>
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

                                <MultiSelect value={selectCategoriesOps} onChange={(e) => {
                                    const selectedValues = e.value;


                                    const selectedCategories = listCategoriesOps.filter(op => selectedValues.includes(op.value)).map(op => op.value);

                                    setSelectCategoriesOps(selectedCategories as string[])
                                    setDetailStoreGetNearRequest(prevState => ({
                                        ...prevState,
                                        categories: selectedCategories ? selectedCategories.join(', ') : ""
                                    }));
                                }} options={listCategoriesOps} optionLabel="name"
                                    filter placeholder="Select Categories" maxSelectedLabels={3} className="w-full" />
                            </div>
                        </div>
                        <div className="mx-auto w-full flex flex-column md:flex-row justify-content-center">
                            <div className=" md:pr-2 mb-4 md:mb-0  md:col-4 col-12  ">

                                <Dropdown className="w-full"
                                    value={selectProvinceOp} onChange={(e) => {

                                        const selectedValue = e.value;
                                        const selectedProvince = listProvincesOps.find(op => op.value === selectedValue);
                                        setSelectProvinceOp(e.value)
                                        handleGetListDistricts(e.value);
                                        setDetailStoreGetNearRequest(prevState => ({
                                            ...prevState,
                                            province: selectedProvince ? selectedProvince.name : ""
                                        }));

                                    }}
                                    options={listProvincesOps}
                                    optionLabel="name" placeholder="Select Province"
                                    filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate} />

                            </div>
                            <div className="md:pr-2 mb-4 md:mb-0  md:col-4 col-12  ">
                                <Dropdown className="w-full"
                                    value={selectDistrictOp}

                                    onChange={(e) => {
                                        const selectedValue = listDistrictOps.find(op => op.value === e.value);
                                        setSelectDistrictOp(e.value)
                                        handleGetListWards(e.value);
                                        setDetailStoreGetNearRequest(prevState => ({
                                            ...prevState,
                                            district: selectedValue ? selectedValue.name : ""
                                        }));
                                    }}
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
                                        const selectedValue = listWardOps.find(op => op.value === e.value);
                                        setSelectWardOp(e.value)
                                        setDetailStoreGetNearRequest(prevState => ({
                                            ...prevState,
                                            ward: selectedValue ? selectedValue.name : ""
                                        }));
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

                                <Button onClick={handleSearchSubmit} severity="success" label="Search"></Button>
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
