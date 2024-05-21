
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ICategoryModel, ICategoryPaginationResponseModel, ICategoryRequestModel } from '../../../models/categoryModel';
import { createNewCategoryService, getListCategoryService, updateCategoryService } from "../../../Services/categoryServiceApi";
import { IToastValueContext, ToastContext } from "../../context/toastContext";
import { Button } from "primereact/button";

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
export default function CategoryAdmin() {
    const [isNewCategory, setIsNewCategory] = useState<boolean>(true);
    const [listCategories, setListCategories] = useState<ICategoryModel[]>([]);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectCategoryId, setSelectCategoryId] = useState<string>("");
    const [expanded, setExpanded] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [detailCategory, setDetailCategory] = useState<ICategoryModel>(emptyCategory);
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const handleGetListCategories = async () => {
        const res: ICategoryPaginationResponseModel = await getListCategoryService();
        console.log(res)
        setListCategories(res.data);
    };
    const openDialogForCreate = () => {
        handleCancel();
        setDialogVisible(true);
        setIsNewCategory(true);
    };
    const handleCancel = () => {
        setDetailCategory(emptyCategory);
        setSelectCategoryId("");
    }
    const handleSearchSumit = () => {
        if (searchInputRef.current) {
            const value = searchInputRef.current.value.toLowerCase();
            const filtered = listCategories.filter(category =>
                category.name.toLowerCase().includes(value)
            );
            setListCategories(filtered);
        }
    }
    const handleResetSearch = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            handleGetListCategories();
        }
    }
    const handleOpenUpdateModel = (detail: ICategoryModel) => {
        setDetailCategory(detail);
        setDialogVisible(true);
        setIsNewCategory(false);

    }
    const handleCreateNewCategory = async (event: HTMLFormElement) => {
        event?.preventDefault();
        const res = await createNewCategoryService(detailCategory);
        if (res.code === 200) {
            setShowModelToast({
                severity: "success",
                summary: "Success",
                detail: "Create Task Success",
            });
            await handleGetListCategories();
            setDialogVisible(false);
        } else {
            setShowModelToast({
                severity: "warn",
                summary: "Warning",
                detail: `${res?.message || "Something Wrong"}`,
            });
        }
    };
    const handleUpdateCategory = async (event: HTMLFormElement) => {
        event?.preventDefault();
        const res = await updateCategoryService(selectCategoryId, detailCategory);
        if (res.code === 200) {
            setShowModelToast({
                severity: "success",
                summary: "Success",
                detail: "Update Task Success",
            });
            await handleGetListCategories();
            setDialogVisible(false);
        } else {
            setShowModelToast({
                severity: "warn",
                summary: "Warning",
                detail: `${res?.message || "Something Wrong"}`,
            });
        }
    };
    const handleUpdateDetailCategory = (detail: ICategoryModel) => {
        setDetailCategory(detail);
        setDialogVisible(true);
        setIsNewCategory(false)
    }
    useEffect(() => {
        handleGetListCategories();
    }, []);
    const bodyleftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2 flex align-items-center gap-5">
                    <h2 className="font-bold m-0">Category List</h2>
                    <Button
                        label="New"
                        onClick={openDialogForCreate}
                        icon="pi pi-plus"
                        severity="success"
                        className=" mr-2"
                    />

                </div>
            </React.Fragment>
        );
    };
    const bodyStatusTemplate = (rowData: ICategoryModel) => {
        let content;
        if (rowData.isActive === true) {
            content = (
                <Tag className="px-3 text-xl" severity="success" value="enable"></Tag>
            );
        } else {
            content = (
                <Tag className="px-3 text-xl" severity="warning" value="disable"></Tag>
            );
        }
        return content;
    };
    const bodyActionTemplate = (rowData: ICategoryModel) => {
        return (
            <div key={rowData.id} className="flex-nowrap flex">
                {/* Update Button */}
                <Button
                    icon="pi pi-pencil"
                    label="Update"
                    className="p-button-rounded p-button-success p-mr-2 "
                    onClick={() => handleOpenUpdateModel(rowData)}
                />
            </div>
        );
    };

    return (
        <>
            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toolbar className="mb-4" left={bodyleftToolbarTemplate}></Toolbar>
                        <div className="flex  md:flex-row flex-column align-items-center mb-4 gap-3 ">
                            <span className="p-input-icon-left ">
                                <i className="pi pi-search" />
                                <input
                                    className={`p-inputtext p-component w-20rem py-3 ${expanded ? ('w-30rem') : ("")}`}
                                    type="text"
                                    placeholder="Filter search"
                                    ref={searchInputRef}
                                    onFocus={() => { setExpanded(true) }}
                                    onBlur={() => { setExpanded(false) }}
                                    style={{ transition: 'width 0.3s ease-in-out' }}
                                />
                            </span>
                            <div>
                                <Button
                                    label="Search"
                                    icon="pi pi-search"
                                    severity="secondary"
                                    className="ml-2"
                                    onClick={handleSearchSumit}
                                />{" "}
                                <Button
                                    label="Reset"
                                    icon="pi pi-undo"
                                    severity="secondary"
                                    className="ml-2"
                                    onClick={handleResetSearch}
                                />
                            </div>


                        </div>
                        <DataTable size="large" value={listCategories} paginator rows={5}>

                            <Column

                                field="name" header="Category Name"
                            />

                            <Column

                                field="parentCategoryName" header="Category parent name"
                            />

                            <Column

                                field="description"
                                header="Description"

                            />
                            <Column

                                field="slug"
                                header="Slug"

                            />

                            <Column

                                field="status"
                                header="Status"
                                body={bodyStatusTemplate}

                            />
                            <Column field="note" header="Note" />
                            <Column header="Actions" body={bodyActionTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>
            {/* <Dialog
                header={isNewCategory ? "Add User" : "Update User"}
                visible={dialogVisible}
                style={{ width: "550px" }}
                onHide={() => setDialogVisible(false)}>
                <form
                    className="p-fluid"
                    onSubmit={isNewCategory ? handleCreateNewCategory : handleUpdateCategory}>
                    <div className="p-field mb-4">
                        <label>Name</label>
                        <InputText
                            name="name"
                            value={detailCategory.name}
                            onChange={handleChangeUpdate}
                            className="mt-2"
                            placeholder="name..."
                            required={true}
                        />
                    </div>
                    <div className="p-field mb-4">
                        <label>Email</label>
                        <InputText
                            name="email"
                            type="email"
                            value={detailUserUpdate.email}
                            onChange={handleChangeUpdate}
                            className="mt-2"
                            placeholder="email..."
                            required={true}
                            disabled={isCreate ? false : true}
                        />
                    </div>
                    <div className="p-field mb-4">
                        <label>Password</label>
                        <InputText
                            name="password"
                            type="text"
                            value={detailUserUpdate.password}
                            onChange={handleChangeUpdate}
                            className="mt-2"
                            placeholder="password..."
                            required={true}
                            disabled={isCreate ? false : true}
                        />
                    </div>
                    <div className="p-field mb-4 flex justify-content-end">
                        <div className="flex w-6">
                            <Button
                                type="button"
                                label="Cancel"
                                className="p-button-text underline"
                                onClick={() => setDialogVisible(false)}
                            />
                            <Button
                                label={isCreate ? "Create" : "Update"}
                                severity="success"
                                type="submit"
                            />
                        </div>
                    </div>
                </form>
            </Dialog> */}

        </>
    )
}
