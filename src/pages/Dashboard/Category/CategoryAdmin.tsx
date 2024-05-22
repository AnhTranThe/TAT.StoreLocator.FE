/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ICategoryModel, ICategoryPaginationResponseModel, ICategoryRequestModel } from '../../../models/categoryModel';
import { ISelectBoxValueModel } from "../../../models/commonModel";
import { IPaginationRequestModel } from "../../../models/paginationModel";
import { createNewCategoryService, getListCategoryService, getListParentCategoryService, updateCategoryService } from "../../../Services/categoryServiceApi";
import { validateCategory } from "../../../utils/yup";
import { IToastValueContext, ToastContext } from "../../context/toastContext";
import { ProgressSpinner } from "primereact/progressspinner";

const emptyCategory: ICategoryModel = {
    id: "",
    name: "",
    description: "",
    slug: "",
    isActive: true,
    createdAt: undefined,
    createdBy: "",
    updatedAt: undefined,
    updatedBy: "",
    parentCategoryName: "",
    parentCategoryId: "",
    productResponseModels: []
}

const listIsActiveStatus: ISelectBoxValueModel[] = [
    { name: "Active", value: true },
    { name: "Disable", value: false }
];

export default function CategoryAdmin() {
    const [isNewCategory, setIsNewCategory] = useState<boolean>(true);
    const [listCategories, setListCategories] = useState<ICategoryModel[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [listParentCategoriesOps, setListParentCategoriesOps] = useState<ISelectBoxValueModel[]>([]);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [expanded, setExpanded] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [detailCategory, setDetailCategory] = useState<ICategoryModel>(emptyCategory);
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const [rowsPage, setRowsPage] = useState(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCategories = useCallback(async (request: IPaginationRequestModel) => {
        setLoading(true);
        try {
            const res: ICategoryPaginationResponseModel = await getListCategoryService(request);
            setListCategories(res.data);
            setTotalRecords(res.totalCount);
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch categories",
            });
        }
        finally {
            setLoading(false);
        }
    }, [setShowModelToast]);
    const fetchParentCategories = useCallback(async (request: IPaginationRequestModel) => {
        try {
            const res: ICategoryPaginationResponseModel = await getListParentCategoryService(request);
            setListParentCategoriesOps(res.data.map((item) => ({
                name: item.name,
                value: item.id,
            })));
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch parent categories",
            });
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
        fetchCategories(pagingRequest);

    }, [fetchCategories]);

    const openDialogForCreate = () => {
        setDetailCategory(emptyCategory);
        setDialogVisible(true);
        setIsNewCategory(true);

    };


    const handleSearchSubmit = () => {
        const value = searchInputRef.current?.value || '';
        const pagingRequest: IPaginationRequestModel = {
            pageIndex: pageIndex,
            pageSize: 10000000,
            searchString: value
        };
        fetchCategories(pagingRequest);
    };

    const handleResetSearch = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            const pagingRequest: IPaginationRequestModel = {
                pageIndex: pageIndex,
                pageSize: rowsPage,
                searchString: ''
            };
            fetchCategories(pagingRequest);
        }
    };
    const openDialogForUpdate = (detail: ICategoryModel) => {
        setDetailCategory(detail);
        setDialogVisible(true);
        setIsNewCategory(false);
    };

    const handleCreateNewCategory = async (data: ICategoryRequestModel) => {
        try {
            const res = await createNewCategoryService(data);
            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Category created successfully",
                });
                const pagingRequest: IPaginationRequestModel = {
                    pageIndex: pageIndex,
                    pageSize: rowsPage,
                    searchString: searchInputRef.current?.value || ''
                };
                await fetchCategories(pagingRequest);
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
                detail: "Failed to create category",
            });
        }
    };

    const handleUpdateCategory = async (id: string, data: ICategoryRequestModel) => {
        try {
            const res = await updateCategoryService(id, data);
            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Category updated successfully",
                });
                const pagingRequest: IPaginationRequestModel = {
                    pageIndex: pageIndex,
                    pageSize: rowsPage,
                    searchString: searchInputRef.current?.value || ''
                };
                await fetchCategories(pagingRequest);
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
                detail: "Failed to update category",
            });
        }
    };
    const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: detailCategory?.id,
            name: detailCategory?.name,
            description: detailCategory?.description,
            isActive: detailCategory?.isActive,
            slug: detailCategory?.slug,
            parentCategoryId: detailCategory?.parentCategoryId
        },
        validationSchema: validateCategory,
        onSubmit: async (value) => {
            try {
                if (isNewCategory) {
                    const request: ICategoryRequestModel = {
                        name: value.name,
                        description: value.description,
                        isActive: value.isActive,
                        parentCategoryId: value.parentCategoryId
                    };
                    await handleCreateNewCategory(request);
                } else {
                    const request: ICategoryRequestModel = {
                        name: value.name,
                        description: value.description,
                        isActive: value.isActive,
                        slug: value.slug,
                        parentCategoryId: value.parentCategoryId
                    };
                    await handleUpdateCategory(value.id, request);
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

    const handleChangeDropdownCategory = (event: DropdownChangeEvent) => {
        const { name, value } = event.target;
        setDetailCategory((pre) => {
            return {
                ...pre,
                [name]: value,
            };
        });
        setFieldValue(name, value);
    };
    const handleChangeInputCategory = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDetailCategory((pre) => {
            return {
                ...pre,
                [name]: value,
            };
        });
        setFieldValue(name, value);
    };
    const handleChangeRadioButton = (event: RadioButtonChangeEvent) => {
        const { name, value }: { name: string, value: any } = event.target;
        setDetailCategory((pre) => {
            return {
                ...pre,
                [name]: value.value,
            };
        });
    };
    useEffect(() => {
        const pagingRequest: IPaginationRequestModel = {
            pageIndex: pageIndex,
            pageSize: rowsPage,
            searchString: searchInputRef.current?.value || ''
        };
        fetchCategories(pagingRequest);
        fetchParentCategories({ pageIndex: 1, pageSize: 10000, searchString: "" });
    }, [fetchCategories, pageIndex, rowsPage, fetchParentCategories]);

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" right={rightContents} left={leftContents}></Toolbar>
                    {loading ? (
                        <div style={{ height: 'calc(100vh - 22rem)' }} className="flex justify-content-center align-items-center ">
                            <ProgressSpinner />
                        </div>) : (
                        <DataTable value={listCategories} size="small" >
                            <Column field="name" header="Category Name" body={(data: ICategoryModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Category Name</span>
                                    {data.name}
                                </React.Fragment>
                            )}></Column>
                            <Column field="parentCategoryName" header="Category parent name" body={(data: ICategoryModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Category parent name</span>
                                    {data.parentCategoryName}
                                </React.Fragment>
                            )}></Column>


                            <Column field="description" header="Description" body={(data) => (
                                <React.Fragment>
                                    <span className="p-column-title">Description</span>
                                    {data.description}
                                </React.Fragment>
                            )}></Column>
                            <Column field="slug" header="Slug" body={(data) => (
                                <React.Fragment>
                                    <span className="p-column-title">Slug</span>
                                    {data.slug}
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
                            <Column header="Edit" body={(data) => (
                                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => openDialogForUpdate(data)} />
                            )}></Column>
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
                header={isNewCategory ? "Create category" : `Update category`}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => {
                    setDetailCategory(emptyCategory)
                    setDialogVisible(false)
                }}
            >
                <form onSubmit={handleSubmit} className="grid p-fluid">
                    <div className="field col-12">
                        <label htmlFor="name">Category Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChangeInputCategory}
                            className={`p-inputtext p-component ${errors.name && touched.name ? 'p-invalid' : ''}`}
                        />
                        {errors.name && touched.name && <small className="p-error">{errors.name}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChangeInputCategory}
                            className={`p-inputtext p-component ${errors.description && touched.description ? 'p-invalid' : ''}`}
                        />
                        {errors.description && touched.description && <small className="p-error">{errors.description}</small>}
                    </div>
                    {!isNewCategory && (
                        <div className="field col-12">
                            <label htmlFor="slug">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                id="slug"
                                value={values.slug}
                                onBlur={handleBlur}
                                onChange={handleChangeInputCategory}
                                className={`p-inputtext p-component ${errors.slug && touched.slug ? 'p-invalid' : ''}`}
                            />
                            {errors.slug && touched.slug && <small className="p-error">{errors.slug}</small>}
                        </div>
                    )}
                    <div className="field col-12">
                        <label htmlFor="isActive">Status</label>

                        {listIsActiveStatus.map((e) => (
                            <div key={e.name} className="field-radiobutton">
                                <RadioButton
                                    inputId={e.name}
                                    name="isActive"
                                    value={e}
                                    onChange={handleChangeRadioButton}
                                    checked={values.isActive === e.value}
                                />
                                <label htmlFor={e.name} className="ml-2">{e.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="parentCategoryId">Parent Category</label>

                        <Dropdown className="w-full my-3"
                            value={values.parentCategoryId} onChange={handleChangeDropdownCategory}
                            name="parentCategoryId"
                            optionLabel="name"
                            options={listParentCategoriesOps}
                            placeholder="Select parent category"
                            filter valueTemplate={selectedFilterDropDownTemplate} itemTemplate={filterDropDownOptionTemplate} />
                    </div>
                    <div className="field flex col-12">
                        <Button label="Submit" type="submit" className="mr-2" />
                        <Button label="Cancel" type="button" className="p-button-secondary" onClick={() => {
                            setDetailCategory(emptyCategory);
                            setDialogVisible(false)
                        }} />
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
