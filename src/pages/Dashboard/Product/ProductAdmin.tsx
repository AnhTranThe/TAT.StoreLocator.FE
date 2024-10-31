/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import { RadioButtonChangeEvent } from "primereact/radiobutton";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoryModel } from "../../../models/categoryModel";
import { IBaseResponseModel, ISelectBoxValueModel } from "../../../models/commonModel";
import { IPaginationRequestModel } from "../../../models/paginationModel";
import { IProductModel, IProductPaginationResponseModel, IProductRequestmodel } from "../../../models/productModel";
import { IStoreModel } from "../../../models/storeModel";
import { getListParentCategoryService, getListSubCategoryService } from "../../../Services/categoryServiceApi";
import { createNewProductService, getListProductsService, updateProductService } from "../../../Services/productServiceApi";
import { getListStoreService } from "../../../Services/storeServiceApi";
import { validateProduct } from "../../../utils/yup";
import { IToastValueContext, ToastContext } from "../../context/toastContext";



const emptyProductRequest: IProductRequestmodel = {
    name: "",
    description: "",
    content: "",
    note: "",
    slug: "",
    price: 0,
    discount: 0,
    metaTitle: "",
    metaDescription: "",
    quantity: 0,
    rating: 0,
    sKU: "",
    isActive: true,
    productViewCount: 0,
    categoryId: "",
    storeId: "",

}
const pagingAllListRequest: IPaginationRequestModel = {
    pageSize: 10000,
    pageIndex: 1,
}
const listIsActiveStatus: ISelectBoxValueModel[] = [
    { name: "Active", value: true },
    { name: "Disable", value: false }
];

export default function ProductAdmin() {
    const nav = useNavigate();
    const [isNew, setIsNew] = useState<boolean>(true);
    const [listProducts, setListProducts] = useState<IProductModel[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [expanded, setExpanded] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    //const [detailStore, setDetailStore] = useState<IStoreModel>(emptyStore);
    const [detailProductRequest, setDetailProductRequest] = useState<IProductRequestmodel>(emptyProductRequest)
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const [rowsPage, setRowsPage] = useState(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [listParentCategories, setListParentCategories] = useState<ISelectBoxValueModel[]>([]);
    const [listSubCategories, setListSubCategories] = useState<ISelectBoxValueModel[]>([]);
    const [listStores, setListStores] = useState<ISelectBoxValueModel[]>([]);
    const [selectUpdateProductId, setUpdateProductId] = useState<string>("")
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [selectedStoreId, setSelectedStoreId] = useState<string>("");

    const fetchParentCategories = async () => {
        setListParentCategories([]);
        const res = await getListParentCategoryService(pagingAllListRequest);
        if (res && res.data) {
            setListParentCategories((prevList) => [
                ...prevList,
                ...res.data.map((item: ICategoryModel) => ({
                    name: item.name,
                    value: item.id
                }))
            ]);
        } else {
            console.error("Response data is undefined or null.");
        }

    };
    const fetchSubCategories = async () => {
        setListSubCategories([]);
        const res = await getListSubCategoryService(pagingAllListRequest);
        if (res && res.data) {
            setListSubCategories((prevList) => [
                ...prevList,
                ...res.data.map((item: ICategoryModel) => ({
                    name: item.name,
                    value: item.id
                }))
            ]);
        } else {
            console.error("Response data is undefined or null.");
        }

    };
    const fetchStores = async () => {
        setListStores([]);
        const res = await getListStoreService(pagingAllListRequest);
        if (res && res.data) {
            setListStores((prevList) => [
                ...prevList,
                ...res.data.map((item: IStoreModel) => ({
                    name: item.name,
                    value: item.id
                }))
            ]);
        } else {
            console.error("Response data is undefined or null.");
        }

    };


    const fetchProducts = useCallback(async (request: IPaginationRequestModel) => {
        setLoading(true);
        try {
            const res: IProductPaginationResponseModel = await getListProductsService(request);
            setListProducts(res.data as IProductModel[])
            setTotalRecords(res.totalCount);
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch products",
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
        fetchProducts(pagingRequest);

    }, [fetchProducts]);

    const openDialogForCreate = () => {
        //  setDetailStore(emptyStore);
        setDialogVisible(true);
        setIsNew(true);
        setDetailProductRequest(emptyProductRequest);
        setUpdateProductId('');
    };
    const handleSearchSubmit = () => {
        const value = searchInputRef.current?.value || '';
        const pagingRequest: IPaginationRequestModel = {
            pageIndex: pageIndex,
            pageSize: 10000000,
            searchString: value
        };
        fetchProducts(pagingRequest);
    };
    const handleResetSearch = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            const pagingRequest: IPaginationRequestModel = {
                pageIndex: pageIndex,
                pageSize: rowsPage,
                searchString: ''
            };
            fetchProducts(pagingRequest);
        }
    };
    const openDialogForUpdate = async (detail: IProductModel) => {
        const updateRequest: IProductRequestmodel = {
            name: detail.name || "",
            description: detail.description,
            content: detail.content || "",
            note: detail.note,
            slug: detail.slug,
            price: detail.price || 0,
            discount: detail.discount || 0,
            metaTitle: detail.metaTitle,
            metaDescription: detail.metaDescription,
            quantity: detail.quantity || 0,
            rating: detail.rating,
            sKU: detail.sku,
            isActive: detail.isActive,
            productViewCount: detail.productViewCount || 0,
            categoryId: detail.categoryId,
            storeId: detail.storeId,
        }

        setDetailProductRequest(updateRequest)
        setDialogVisible(true);
        setUpdateProductId(detail.id);
        setIsNew(false);

    }
    const handleCancel = () => {
        setSelectedCategoryId('');
        setSelectedStoreId('');
        setDetailProductRequest(emptyProductRequest)
    }
    const handleCreateNewProduct = async (data: IProductRequestmodel) => {
        try {
            const res: IBaseResponseModel = await createNewProductService(data);
            console.log(res);
            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Product created successfully",
                });
                const pagingRequest: IPaginationRequestModel = {
                    pageIndex: pageIndex,
                    pageSize: rowsPage,
                    searchString: searchInputRef.current?.value || ''
                };
                await fetchProducts(pagingRequest);
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
                detail: "Failed to create new product",
            });
        }
    };
    const handleUpdateProduct = async (id: string, data: IProductRequestmodel) => {
        try {
            console.log(data);

            const res = await updateProductService(id, data);
            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Product updated successfully",
                });
                const pagingRequest: IPaginationRequestModel = {
                    pageIndex: pageIndex,
                    pageSize: rowsPage,
                    searchString: searchInputRef.current?.value || ''
                };
                await fetchProducts(pagingRequest);
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
                detail: "Failed to update product",
            });
        }
    };

    const handleNavigateGalleryInfo = (data: IProductModel) => {
        const { id } = data;
        nav(`/admin/gallery?type=product&id=${id}`)
    }

    const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: detailProductRequest?.name || '',
            description: detailProductRequest?.description || '',
            content: detailProductRequest?.content || '',
            note: detailProductRequest?.note || '',
            slug: detailProductRequest?.slug || '',
            metaTitle: detailProductRequest?.metaTitle || '',
            metaDescription: detailProductRequest?.metaDescription || '',
            sKU: detailProductRequest?.sKU || '',
            categoryId: detailProductRequest?.categoryId || '',
            storeId: detailProductRequest?.storeId || '',
            price: detailProductRequest?.price || 0,
            discount: detailProductRequest?.discount || 0,
            quantity: detailProductRequest?.quantity || 0,
            rating: detailProductRequest?.rating || 0,
            isActive: detailProductRequest?.isActive,
            productViewCount: detailProductRequest?.productViewCount || 0,
        },
        validationSchema: validateProduct,
        onSubmit: async (values: IProductRequestmodel) => {
            try {

                if (isNew) {
                    console.log("storeData", values);

                    //  await handleCreateNewStore(values);

                }

                else {
                    console.log("storeData", values);
                    //  await handleUpdateStore(selectUpdateStoreId, values);
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
        setDetailProductRequest((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
        setFieldValue(name, value);
    };


    const handleChangeRadioButton = (event: RadioButtonChangeEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { name, value }: { name: string, value: any } = event.target;

        setDetailProductRequest((pre) => {
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
        fetchProducts(pagingRequest);
        fetchParentCategories()
        fetchSubCategories();
        fetchStores();
    }, []);








    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" right={rightContents} left={leftContents}></Toolbar>
                    {loading ? (
                        <div style={{ height: 'calc(100vh - 22rem)' }} className="flex justify-content-center align-items-center ">
                            <ProgressSpinner />
                        </div>) : (
                        <DataTable scrollable scrollHeight="calc(100vh - 25rem)" value={listProducts} size="normal" style={{ minWidth: '50rem' }} >
                            <Column field="name" header="Product Name" style={{ maxWidth: '12rem' }} body={(data: IProductModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Product Name</span>
                                    {data.name}
                                </React.Fragment>
                            )}></Column>
                            <Column field="description" header="description" style={{ maxWidth: '12rem' }} body={(data: IProductModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">description</span>
                                    {data.description}
                                </React.Fragment>
                            )}></Column>

                            <Column field="content" header="content" style={{ maxWidth: '10rem' }} body={(data: IProductModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">content</span>
                                    {data.content}
                                </React.Fragment>
                            )}></Column>

                            <Column field="note" header="Note" style={{ maxWidth: '12rem' }} body={(data: IProductModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Note</span>
                                    {data.note ? data.note : 'N/A'}
                                </React.Fragment>
                            )}></Column>


                            <Column field="price" header="Ward" body={(data: IProductModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Price</span>
                                    {data.price ? data.price : '0'}
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
            {/* 
            <Dialog
                visible={dialogVisible}
                header={isNew ? "Create Product" : `Update Product`}
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
            </Dialog> */}


        </div>
    )
}
