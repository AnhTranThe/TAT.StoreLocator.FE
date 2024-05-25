import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ISelectBoxValueModel } from "../../../models/commonModel";
import { IGalleryModel, IGalleryPaginationResponseModel, IGalleryUpdateRequestModel, IGalleryUploadRequestModel, IGetListGalleryByIdRequestModel } from '../../../models/galleryModel';
import { IPaginationRequestModel } from "../../../models/paginationModel";
import { getAllImagesService, getListImagesByIdService, updateImageService } from "../../../Services/galleryServiceApi";
import { IToastValueContext, ToastContext } from "../../context/toastContext";


const listIsThumbnailStatus: ISelectBoxValueModel[] = [
    { name: "Yes", value: true },
    { name: "No", value: false }
];

const emptyUpdateImage: IGalleryUpdateRequestModel = {
    isThumbnail: false,
    type: "",
    typeId: "",

}


const emptyUploadImage: IGalleryUploadRequestModel = {
    fileUpload: undefined,
    isThumbnail: false,
    Type: "",
    TypeId: ""
}

const emptyImage: IGalleryModel = {
    id: "",
    url: "",
    isThumbnail: false,
    fileBelongsTo: "",
    fileName: "",
    publicId: ""
}



export default function GalleryAdmin() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const [rowsPage, setRowsPage] = useState(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)

    const [listImages, setListImages] = useState<IGalleryModel[]>([])
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const [dialogUploadVisible, setUploadDialogVisible] = useState<boolean>(false);
    const [dialogUpdateVisible, setDialogUpdateVisible] = useState<boolean>(false);
    const [detailGalleryUpdateRequestModel, setDetailGalleryUpdateRequestModel] = useState<IGalleryUpdateRequestModel>(emptyUpdateImage);
    const [detailGalleryUploadRequestModel, setDetailGalleryUploadRequestModel] = useState<IGalleryUploadRequestModel>(emptyUploadImage);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState<IGalleryModel>(emptyImage);
    const fetchImageList = useCallback(async (request: IPaginationRequestModel) => {
        setLoading(true);
        try {
            const res: IGalleryPaginationResponseModel = await getAllImagesService(request);
            setListImages(res.data);
            setTotalRecords(res.totalCount);
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch images",
            });
        }
        finally {
            setLoading(false);
        }
    }, [setShowModelToast]);

    const fetchListImagesById = useCallback(async (request: IGetListGalleryByIdRequestModel) => {
        setLoading(true);
        try {
            const res: IGalleryPaginationResponseModel = await getListImagesByIdService(request);
            setListImages(res.data);
            setTotalRecords(res.totalCount);
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch images",
            });
        }
        finally {
            setLoading(false);
        }
    }, [setShowModelToast]);

    useEffect(() => {
        (async () => {
            let request;
            const paginationRequest: IPaginationRequestModel = {
                pageIndex: 1, // Set your default pageIndex
                pageSize: 10, // Set your default pageSize
                searchString: '' // Set your default search string
            };

            if (type && id) {
                request = {
                    ...paginationRequest,
                    type,
                    id
                };

                await fetchListImagesById(request as IGetListGalleryByIdRequestModel);
            } else {

                request = paginationRequest;
                await fetchImageList(request);
            }
        })();
    }, [type, id, fetchImageList, fetchListImagesById]);

    const openDialogForUpdate = async (detail: IGalleryModel) => {
        const updateRequest: IGalleryUpdateRequestModel = {
            isThumbnail: detail.isThumbnail,
            type: type && type.trim() || "",
            typeId: id && id.trim() || "",
        }
        setSelectedImage({ ...selectedImage, id: detail.id, url: detail.url })
        setDetailGalleryUpdateRequestModel(updateRequest)
        setDialogUpdateVisible(true);
    };
    const openDialogForUpload = async () => {
        setUploadDialogVisible(true);
    }

    const handleUpdateImage = async (id: string, data: IGalleryUpdateRequestModel) => {
        try {
            const res = await updateImageService(id, data);

            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "gallery updated successfully",
                });

                let request;
                const paginationRequest: IPaginationRequestModel = {
                    pageIndex: 1, // Set your default pageIndex
                    pageSize: 10, // Set your default pageSize
                    searchString: '' // Set your default search string
                };

                if (type && id) {

                    request = {
                        ...paginationRequest,
                        type,
                        id
                    };

                    await fetchListImagesById(request as IGetListGalleryByIdRequestModel);
                } else {

                    request = paginationRequest;
                    await fetchImageList(request);
                }
                setDialogUpdateVisible(false);
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
                detail: "Failed to update gallery",
            });
        }
    };


    const handleChangeDropdown = (e: DropdownChangeEvent) => {
        const { name, value } = e.target;
        setDetailGalleryUpdateRequestModel((pre) => {
            return {
                ...pre,
                [name]: value,
            };
        });
    };

    const rightContents = (
        <div className="flex flex-wrap gap-2">

            {type && id && <Button label="Create" icon="pi pi-plus" onClick={openDialogForUpload} severity="success" />
            }

        </div>
    );

    const handleSearchSubmit = async () => {
        const value = searchInputRef.current?.value || '';
        const pagingRequest: IPaginationRequestModel = {
            pageIndex: pageIndex,
            pageSize: 10000000,
            searchString: value
        };
        let request;


        if (type && id) {

            request = {
                ...pagingRequest,
                type,
                id
            };

            await fetchListImagesById(request as IGetListGalleryByIdRequestModel);
        } else {

            request = pagingRequest;
            await fetchImageList(request);
        }
    };

    const handleResetSearch = async () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            const pagingRequest: IPaginationRequestModel = {
                pageIndex: pageIndex,
                pageSize: rowsPage,
                searchString: ''
            };
            let request;


            if (type && id) {

                request = {
                    ...pagingRequest,
                    type,
                    id
                };

                await fetchListImagesById(request as IGetListGalleryByIdRequestModel);
            } else {

                request = pagingRequest;
                await fetchImageList(request);
            }
        }
    };



    const onPageChange = useCallback(async (event: PaginatorPageChangeEvent) => {
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
        let request;


        if (type && id) {

            request = {
                ...pagingRequest,
                type,
                id
            };

            await fetchListImagesById(request as IGetListGalleryByIdRequestModel);
        } else {

            request = pagingRequest;
            await fetchImageList(request);
        }

    }, [type, id, fetchListImagesById, fetchImageList]);

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
    const handleSubmitUpload = () => {

    }


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" right={rightContents} left={leftContents}></Toolbar>
                    {loading ? (
                        <div style={{ height: 'calc(100vh - 22rem)' }} className="flex justify-content-center align-items-center ">
                            <ProgressSpinner />
                        </div>) : (
                        <DataTable stripedRows scrollable scrollHeight="calc(100vh - 25rem)" value={listImages} size="normal" style={{ minWidth: '50rem' }} >
                            <Column header="Image" style={{ maxWidth: '10rem' }} body={(data: IGalleryModel) => (
                                <React.Fragment>
                                    <Image src={data.url} alt="Image" width="200" preview />
                                </React.Fragment>
                            )}></Column>

                            <Column header="File name" style={{ maxWidth: '10rem' }} body={(data: IGalleryModel) => (
                                <React.Fragment>

                                    {data.fileName}
                                </React.Fragment>
                            )}></Column>
                            <Column header="File belong to" style={{ maxWidth: '10rem' }} body={(data: IGalleryModel) => (
                                <React.Fragment>

                                    {data.fileBelongsTo}
                                </React.Fragment>
                            )}></Column>





                            <Column header="Status" body={(data: IGalleryModel) => (
                                <React.Fragment>
                                    <span className="p-column-title">Status</span>
                                    <Tag
                                        value={data.isThumbnail ? "Yes" : "No"}
                                        severity={data.isThumbnail ? "success" : "danger"}
                                    />
                                </React.Fragment>
                            )}></Column>
                            <Column header="Action" body={(data: IGalleryModel) =>
                            (
                                <React.Fragment>
                                    {type && id ? (
                                        <>
                                            <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => openDialogForUpdate(data)} />
                                            <Button icon="pi pi-trash" rounded severity="danger" className="mr-2" />
                                        </>
                                    ) : null}
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
                visible={dialogUploadVisible}
                header={"Upload image"}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => {

                    setUploadDialogVisible(false)

                }}
            >
                <form onSubmit={handleSubmitUpload} className="grid p-fluid">
                    <div className="field flex col-12">
                        <FileUpload className="w-full" name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />

                    </div>


                    <div className="field flex col-12">
                        <Button label="Submit" type="submit" className="mr-2" />
                        <Button label="Cancel" type="button" className="p-button-secondary" onClick={() => {

                            setUploadDialogVisible(false)
                        }} />
                    </div>
                </form>
            </Dialog>
            <Dialog
                visible={dialogUpdateVisible}
                header={`Update image thumbnail`}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => {

                    setDialogUpdateVisible(false)
                    setSelectedImage(emptyImage)
                    setDetailGalleryUpdateRequestModel(emptyUpdateImage)


                }}
            >
                <form onSubmit={() => { handleUpdateImage(selectedImage.id, detailGalleryUpdateRequestModel) }} className="grid p-fluid">


                    <div className="field col-12 flex justify-content-center">
                        <Image src={selectedImage.url} alt="Image" width="250" />
                    </div>

                    <Dropdown
                        className="w-full"
                        value={detailGalleryUpdateRequestModel.isThumbnail}
                        onChange={handleChangeDropdown}
                        options={listIsThumbnailStatus}
                        name="isThumbnail"
                        optionLabel="name"
                        optionValue="value"
                        placeholder="Select Status"
                    />


                    <div className="field flex col-12">
                        <Button label="Submit" type="submit" className="mr-2" />
                        <Button label="Cancel" type="button" className="p-button-secondary" onClick={() => {

                            setDialogUpdateVisible(false)
                            setSelectedImage(emptyImage)
                            setDetailGalleryUpdateRequestModel(emptyUpdateImage)
                        }} />
                    </div>
                </form>
            </Dialog>

        </div >
    )
}
