/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISelectBoxValueModel } from "../../../models/commonModel";
import { IOApiDistrictModel, IOApiProvinceModel, IOApiWardModel } from "../../../models/oApiModel";
import { IPaginationRequestModel } from "../../../models/paginationModel";
import { ICreateStoreResponseModel, IStoreModel, IStorePaginationResponseModel, IStoreRequestModel } from '../../../models/storeModel';
import { getListDistrictsService, getListProvincesService, getListWardsService } from "../../../Services/addressServiceApi";
import { createNewStoreService, getListStoreService, updateStoreService } from "../../../Services/storeServiceApi";
import { extractLatLonFromGoogleMapsUrl, replaceDistrictPatterns, replaceProvincePatterns, replaceWardPatterns } from "../../../utils/Utilities";
import { validateStore } from "../../../utils/yup";
import { IToastValueContext, ToastContext } from "../../context/toastContext";


// const emptyStore: IStoreModel = {
//     id: "",
//     name: "",
//     email: "",
//     phoneNumber: "",
//     isActive: true,
//     address: {
//         id: "",
//         roadName: "",
//         province: "",
//         district: "",
//         ward: "",
//         postalCode: "",
//         createdAt: undefined,
//         createdBy: "",
//         updatedAt: undefined,
//         updatedBy: "",
//         latitude: 0,
//         longitude: 0

//     },
//     averageRating: 0,
//     ratingStore: {
//         numberRating: 0,
//         pointOfRating: 0
//     },
//     mapGalleryStores: []
// }
const emptyStoreRequest: IStoreRequestModel = {
    name: "",
    email: "",
    phoneNumber: "",
    roadName: "",
    province: "",
    district: "",
    ward: "",
    postalCode: "",
    latitude: 0,
    longitude: 0,
    isActive: true,
    // files: []
}

const listIsActiveStatus: ISelectBoxValueModel[] = [
    { name: "Active", value: true },
    { name: "Disable", value: false }
];

export default function StoreAdmin() {
    const nav = useNavigate();
    const [isNewStore, setIsNewStore] = useState<boolean>(true);
    const [listStores, setListStores] = useState<IStoreModel[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [expanded, setExpanded] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    //const [detailStore, setDetailStore] = useState<IStoreModel>(emptyStore);
    const [detailStoreRequest, setDetailStoreRequest] = useState<IStoreRequestModel>(emptyStoreRequest)
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const [rowsPage, setRowsPage] = useState(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [listProvincesOps, setListProvincesOps] = useState<ISelectBoxValueModel[]>([]);
    const [listDistrictOps, setListDistrictOps] = useState<ISelectBoxValueModel[]>([]);
    const [listWardOps, setListWardOps] = useState<ISelectBoxValueModel[]>([]);
    const [selectProvinceOp, setSelectProvinceOp] = useState<string | boolean | number>('');
    const [selectDistrictOp, setSelectDistrictOp] = useState<string | boolean | number>('');
    const [selectWardOp, setSelectWardOp] = useState<string | boolean | number>('');
    const [selectUpdateStoreId, setUpdateStoreId] = useState<string>("");


    const fetchProvinces = async () => {
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
    const fetchDistricts = async (provinceId: number) => {
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
    const fetchWards = async (districtId: number) => {
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

    const fetchStores = useCallback(async (request: IPaginationRequestModel) => {
        setLoading(true);
        try {
            const res: IStorePaginationResponseModel = await getListStoreService(request);
            setListStores(res.data as IStoreModel[])
            setTotalRecords(res.totalCount);
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch stores",
            });
        }
        finally {
            setLoading(false);
        }
    }, [setShowModelToast]);

    const onPageChange = useCallback((event: PaginatorPageChangeEvent) => {
        const newPageIndex = event.page + 1;
        const newRowsPage = event.rows;
        setFirst(event.first);
        setPageIndex(newPageIndex);
        setRowsPage(newRowsPage);

        const pagingRequest: IPaginationRequestModel = {
            pageIndex: newPageIndex,
            pageSize: newRowsPage,
            searchString: searchInputRef.current?.value || ''
        };
        fetchStores(pagingRequest);

    }, [fetchStores]);

    const openDialogForCreate = () => {
        //  setDetailStore(emptyStore);
        setDialogVisible(true);
        setIsNewStore(true);
        setDetailStoreRequest(emptyStoreRequest);
        setUpdateStoreId('');
    };
    const handleSearchSubmit = () => {
        const value = searchInputRef.current?.value || '';
        const pagingRequest: IPaginationRequestModel = {
            pageIndex: pageIndex,
            pageSize: 10000000,
            searchString: value
        };
        fetchStores(pagingRequest);
    };

    const handleResetSearch = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            const pagingRequest: IPaginationRequestModel = {
                pageIndex: pageIndex,
                pageSize: rowsPage,
                searchString: ''
            };
            fetchStores(pagingRequest);
        }
    };

    const openDialogForUpdate = async (detail: IStoreModel) => {
        const updateRequest: IStoreRequestModel = {
            name: detail.name,
            email: detail.email,
            phoneNumber: detail.phoneNumber ? detail.phoneNumber : "",
            roadName: detail.address?.roadName || "",
            province: detail.address?.province || "",
            district: detail.address?.district || "",
            ward: detail.address?.ward || "",
            postalCode: detail.address?.postalCode || "",
            latitude: detail.address?.latitude || 0,
            longitude: detail.address?.longitude || 0,
            isActive: detail.isActive,
        }



        if (updateRequest.province) {
            const existingProvince = listProvincesOps.find(op => replaceProvincePatterns(op.name).toUpperCase().includes(updateRequest.province.trim().toUpperCase()));


            if (existingProvince) {
                await fetchDistricts(Number(existingProvince.value));
                setSelectProvinceOp(existingProvince.value)
            }

        }

        if (updateRequest.district && listDistrictOps.length > 0) {

            const existingDistrict = listDistrictOps.find(op => replaceDistrictPatterns(op.name).toUpperCase().includes(updateRequest.district.trim().toUpperCase()));
            if (existingDistrict) {
                await fetchWards(Number(existingDistrict.value));
                setSelectDistrictOp(existingDistrict.value)
            }

        }
        if (updateRequest.ward && listWardOps.length > 0) {
            const existingWard = listWardOps.find(op => replaceWardPatterns(op.name).toUpperCase().includes(updateRequest.ward.trim().toUpperCase()));
            existingWard && setSelectWardOp(existingWard.value)
        }


        setDetailStoreRequest(updateRequest)
        setDialogVisible(true);
        setUpdateStoreId(detail.id);
        setIsNewStore(false);
    };
    const handleCancel = () => {
        setSelectProvinceOp('');
        setSelectDistrictOp('');
        setSelectWardOp('')
        setDetailStoreRequest(emptyStoreRequest)
    }

    const handleCreateNewStore = async (data: IStoreRequestModel) => {
        try {
            const res: ICreateStoreResponseModel = await createNewStoreService(data);
            console.log(res);
            if (res.baseResponse.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Store created successfully",
                });
                const pagingRequest: IPaginationRequestModel = {
                    pageIndex: pageIndex,
                    pageSize: rowsPage,
                    searchString: searchInputRef.current?.value || ''
                };
                await fetchStores(pagingRequest);
                setDialogVisible(false);
            } else {
                setShowModelToast({
                    severity: "warn",
                    summary: "Warning",
                    detail: res?.baseResponse.message || "Something went wrong",
                });
            }
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to create new store",
            });
        }
    };
    const handleUpdateStore = async (id: string, data: IStoreRequestModel) => {
        try {
            console.log(data);

            const res = await updateStoreService(id, data);
            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Store updated successfully",
                });
                const pagingRequest: IPaginationRequestModel = {
                    pageIndex: pageIndex,
                    pageSize: rowsPage,
                    searchString: searchInputRef.current?.value || ''
                };
                await fetchStores(pagingRequest);
                setDialogVisible(false);
            } else {
                setShowModelToast({
                    severity: "warn",
                    summary: "Warning",
                    detail: res?.message || "Something went wrong",
                });
            }
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to update store",
            });
        }
    };
    const handleNavigateGalleryInfo = (data: IStoreModel) => {
        const { id } = data;
        nav(`/admin/gallery?type=store&id=${id}`)
    }

    const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: detailStoreRequest?.name || '',
            email: detailStoreRequest?.email || '',
            phoneNumber: detailStoreRequest?.phoneNumber || '',
            roadName: detailStoreRequest?.roadName || '',
            province: detailStoreRequest?.province || '',
            district: detailStoreRequest?.district || '',
            ward: detailStoreRequest?.ward || '',
            postalCode: detailStoreRequest?.postalCode || '',
            latitude: detailStoreRequest?.latitude || 0,
            longitude: detailStoreRequest?.longitude || 0,
            isActive: detailStoreRequest?.isActive,
        },
        validationSchema: validateStore,
        onSubmit: async (values: IStoreRequestModel) => {
            try {

                if (isNewStore) {
                    console.log("storeData", values);
                    values.province = replaceProvincePatterns(values.province);
                    values.district = replaceProvincePatterns(values.district);
                    values.ward = replaceProvincePatterns(values.ward);
                    await handleCreateNewStore(values);



                }

                else {
                    console.log("storeData", values);
                    await handleUpdateStore(selectUpdateStoreId, values);
                }
            } catch (error) {
                console.error("Error submitting the form: ", error);
                setShowModelToast({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to submit the form",
                });
            }
        },
    });

    const rightContents = (
        <div className="flex flex-wrap gap-2">
            <Button label="Create" icon="pi pi-plus" severity="success" onClick={openDialogForCreate} />
        </div>
    );
    console.log(values);

    const leftContents = (
        <div className="flex gap-2">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <input
                    type="text"
                    ref={searchInputRef}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit() }}
                    onFocus={() => { setExpanded(true) }}
                    onBlur={() => { setExpanded(false) }}
                    placeholder="Search..."
                    className={`p-inputtext p-component w-20rem py-3 ${expanded ? ('w-30rem') : ("")}`}
                    style={{ transition: 'width 0.3s ease-in-out' }}
                />
            </span>
            <Button label="Search" icon="pi pi-search" onClick={handleSearchSubmit} />
            <Button label="Clear" icon="pi pi-times" onClick={handleResetSearch} />
        </div>
    );
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

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDetailStoreRequest((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
        setFieldValue(name, value);
    };
    const handleExtractLatLonUrl = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const extractValue = extractLatLonFromGoogleMapsUrl(value);
        console.log(extractValue);
        if (extractValue) {
            const { latitude, longitude }: { latitude: number, longitude: number } = extractValue
            setDetailStoreRequest((pre: IStoreRequestModel) => {
                return {
                    ...pre,

                    latitude: latitude,
                    longitude: longitude
                }
            })
        }



    }


    const handleChangeRadioButton = (event: RadioButtonChangeEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { name, value }: { name: string, value: any } = event.target;

        setDetailStoreRequest((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };
    useEffect(() => {
        const pagingRequest: IPaginationRequestModel = {
            pageIndex: pageIndex,
            pageSize: rowsPage,
            searchString: searchInputRef.current?.value || ''
        };
        fetchStores(pagingRequest);
        fetchProvinces()
    }, [fetchStores, pageIndex, rowsPage]);
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" right={rightContents} left={leftContents}></Toolbar>
                    {loading ? (
                        <div style={{ height: 'calc(100vh - 22rem)' }} className="flex justify-content-center align-items-center ">
                            <ProgressSpinner />
                        </div>) : (
                        <DataTable scrollable scrollHeight="calc(100vh - 25rem)" value={listStores} size="normal" style={{ minWidth: '50rem' }} >
                            <Column field="name" header="Store Name" style={{ maxWidth: '12rem' }} body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Store Name</span>
                                    {data.name}
                                </React.Fragment>
                            )}></Column>
                            <Column field="email" header="Email" style={{ maxWidth: '12rem' }} body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Email</span>
                                    {data.email}
                                </React.Fragment>
                            )}></Column>

                            <Column field="phoneNumber" header="Phone number" style={{ maxWidth: '10rem' }} body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Phone number</span>
                                    {data.phoneNumber}
                                </React.Fragment>
                            )}></Column>

                            <Column field="address.roadName" header="Road Name" style={{ maxWidth: '12rem' }} body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Road Name</span>
                                    {data.address ? data.address.roadName : 'N/A'}
                                </React.Fragment>
                            )}></Column>


                            <Column field="address.ward" header="Ward" body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Ward</span>
                                    {data.address ? data.address.ward : 'N/A'}
                                </React.Fragment>
                            )}></Column>

                            <Column field="address.district" header="District" body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">District</span>
                                    {data.address ? data.address.district : 'N/A'}
                                </React.Fragment>
                            )}></Column>


                            <Column field="address.province" header="Province" body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Province</span>
                                    {data.address ? data.address.province : 'N/A'}
                                </React.Fragment>
                            )}></Column>

                            <Column field="address.latitude" header="Latitude" body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Latitude</span>
                                    {data.address ? data.address.latitude : 'N/A'}
                                </React.Fragment>
                            )}></Column>

                            <Column field="address.longitude" header="Longitude" body={(data: IStoreModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Longitude</span>
                                    {data.address ? data.address.longitude : 'N/A'}
                                </React.Fragment>
                            )}></Column>
                            <Column field="isActive" header="Status" body={(data) => (
                                <React.Fragment>
                                    <span className="p-column-title">Status</span>
                                    <Tag
                                        value={data.isActive ? "Active" : "Disable"}
                                        severity={data.isActive ? "success" : "danger"}
                                    />
                                </React.Fragment>
                            )}></Column>
                            <Column header="Action" body={(data) =>
                            (
                                <React.Fragment>
                                    <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => openDialogForUpdate(data)} />
                                    <Button icon="pi pi-images" rounded severity="warning" className="mr-2" onClick={() => handleNavigateGalleryInfo(data)} />

                                </React.Fragment>

                            )

                            }></Column>
                        </DataTable>

                    )
                    }
                    <Paginator
                        first={first}
                        rows={rowsPage}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={onPageChange}
                    ></Paginator>
                </div>
            </div>

            <Dialog
                visible={dialogVisible}
                header={isNewStore ? "Create Store" : `Update Store`}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => {

                    setDialogVisible(false)
                    handleCancel()
                }}
            >
                <form onSubmit={handleSubmit} className="grid p-fluid">
                    <div className="field col-12">
                        <label htmlFor="name">Store Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChangeInput}
                            className={`p-inputtext p-component ${errors.name && touched.name ? 'p-invalid' : ''}`}
                        />
                        {errors.name && touched.name && <small className="p-error">{errors.name}</small>}
                    </div>


                    <div className=" col-12 grid">
                        <div className="col field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChangeInput}
                                className={`p-inputtext p-component ${errors.email && touched.email ? 'p-invalid' : ''}`}
                            />
                            {errors.email && touched.email && <small className="p-error">{errors.email}</small>}
                        </div>
                        <div className="col field">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={values.phoneNumber}
                                onBlur={handleBlur}
                                onChange={handleChangeInput}
                                className={`p-inputtext p-component ${errors.phoneNumber && touched.phoneNumber ? 'p-invalid' : ''}`}
                            />
                            {errors.phoneNumber && touched.phoneNumber && <small className="p-error">{errors.phoneNumber}</small>}
                        </div>
                    </div>




                    <div className=" col-12 grid">

                        <div className="col field">
                            <label htmlFor="province">Province</label>

                            <Dropdown className="w-full"
                                value={selectProvinceOp} onChange={(e) => {
                                    const selectedValue = e.value;
                                    const selectedProvince = listProvincesOps.find(op => op.value === selectedValue);
                                    setSelectProvinceOp(e.value)
                                    fetchDistricts(e.value);
                                    setDetailStoreRequest(prevState => ({
                                        ...prevState,

                                        province: selectedProvince ? selectedProvince.name : "" // Update province with selected province name
                                    }));

                                }}

                                options={listProvincesOps}
                                optionLabel="name" placeholder="Select Province"

                                filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate} />


                            {errors.province && touched.province && <small className="p-error">{errors.province}</small>}
                        </div>

                        <div className="col field">
                            <label htmlFor="district">District</label>
                            <Dropdown className="w-full"
                                value={selectDistrictOp} onChange={(e) => {
                                    const selectedValue = e.value;
                                    const selectDistrict = listDistrictOps.find(op => op.value === selectedValue);
                                    setSelectDistrictOp(e.value)
                                    fetchWards(e.value);
                                    setDetailStoreRequest(prevState => ({
                                        ...prevState,
                                        district: selectDistrict ? selectDistrict.name : ""
                                    }));

                                }}

                                options={listDistrictOps}
                                optionLabel="name" placeholder="Select District"
                                filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate} />

                        </div>




                        <div className="col field">
                            <label htmlFor="ward">Ward</label>

                            <Dropdown className="w-full"
                                value={selectWardOp} onChange={(e) => {
                                    const selectedValue = e.value;
                                    const selectWard = listWardOps.find(op => op.value === selectedValue);
                                    setSelectWardOp(e.value)
                                    setDetailStoreRequest(prevState => ({
                                        ...prevState,
                                        ward: selectWard ? selectWard.name : ""
                                    }));

                                }}

                                options={listWardOps}
                                optionLabel="name" placeholder="Select Ward"
                                filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate} />

                        </div>


                    </div>
                    <div className="field col-12">

                        <label htmlFor="roadName">Road name</label>
                        <input
                            type="text"
                            name="roadName"
                            id="roadName"
                            value={values.roadName}
                            onBlur={handleBlur}
                            onChange={handleChangeInput}
                            className={`p-inputtext p-component ${errors.roadName && touched.roadName ? 'p-invalid' : ''}`}
                        />
                        {errors.roadName && touched.roadName && <small className="p-error">{errors.roadName}</small>}
                    </div>
                    <div className="field col-12">

                        <label>Google map Url</label>
                        <input
                            type="text"

                            onBlur={handleBlur}
                            onChange={handleExtractLatLonUrl}
                            className={`p-inputtext p-component`}
                        />

                    </div>
                    <div className="field col-12 grid">
                        <div className="col field">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                id="latitude"
                                value={values.latitude}
                                onBlur={handleBlur}
                                onChange={handleChangeInput}
                                className={`p-inputtext p-component ${errors.latitude && touched.latitude ? 'p-invalid' : ''}`}
                            />
                            {errors.latitude && touched.latitude && <small className="p-error">{errors.latitude}</small>}

                        </div>
                        <div className="col field">
                            <label htmlFor="longitude">Longtitude</label>
                            <input
                                type="text"
                                name="longitude"
                                id="longitude"
                                value={values.longitude}
                                onBlur={handleBlur}
                                onChange={handleChangeInput}
                                className={`p-inputtext p-component ${errors.longitude && touched.longitude ? 'p-invalid' : ''}`}
                            />
                            {errors.longitude && touched.longitude && <small className="p-error">{errors.longitude}</small>}

                        </div>


                    </div>
                    <div className="field col-12">
                        <label htmlFor="isActive">Status</label>
                        {listIsActiveStatus.map((e) => (
                            <div key={e.name} className="field-radiobutton">
                                <RadioButton
                                    inputId={e.name}
                                    name="isActive"
                                    value={e.value}
                                    onChange={handleChangeRadioButton}
                                    checked={detailStoreRequest.isActive === e.value}
                                />
                                <label htmlFor={e.name} className="ml-2">{e.name}</label>
                            </div>
                        ))}
                    </div>



                    <div className="field flex col-12">
                        <Button label="Submit" type="submit" className="mr-2" />
                        <Button label="Cancel" type="button" className="p-button-secondary" onClick={() => {

                            setDialogVisible(false)
                            handleCancel()
                        }} />
                    </div>
                </form>
            </Dialog>


        </div>
    )
}
