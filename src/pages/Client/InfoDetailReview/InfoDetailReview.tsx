import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { EReviewStatusType } from "../../../enums";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IUserSaveInfoModel } from "../../../models/authModel";
import { IBaseResponseModel } from "../../../models/commonModel";
import { IReviewRequestModel, IReviewResultResponseModel } from "../../../models/reviewModel";
import { IStoreModel } from "../../../models/storeModel";
import { createNewReviewService, updateReviewService } from "../../../Services/reviewServiceApi";
import { getDetailStoreInfo } from "../../../store/action/storeAction";
import { useAppDispatch } from "../../../store/store";
import { IToastValueContext, ToastContext } from "../../context/toastContext";
import ReviewItem from "../ReviewItem/ReviewItem";


export default function InfoDetailReview() {
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const emptyReviewRequestModel: IReviewRequestModel = {
        typeId: detailStoreItemInfo.id,
        content: "",
        type: "store",
        userId: "",
        ratingValue: 0,
        status: EReviewStatusType.Approve
    }
    const [isNewReview, setIsNewReview] = useState<boolean>(true);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [detailReviewRequest, setDetailReviewRequest] = useState<IReviewRequestModel>(emptyReviewRequestModel)
    const { userLoginInfo }: { userLoginInfo: IUserSaveInfoModel } = useAppSelector(
        (state) => state.userReducer
    );
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const [checkUserReview, setCheckUserReview] = useState(false)
    const [reviewUpdateId, setReviewUpdateId] = useState('');

    console.log(detailReviewRequest);


    const ReviewListContainer = styled.div`
width: 100%;
    margin: 20px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
    useEffect(() => {
        const userReview = detailStoreItemInfo.reviews.find((review) => review.userEmail === userLoginInfo.email);
        console.log(userReview);
        if (userReview) {
            const request: IReviewRequestModel = {
                typeId: userReview.storeId ?? "",
                content: userReview.content,
                type: "store",
                userId: userLoginInfo.id,
                ratingValue: userReview.ratingValue,
                status: EReviewStatusType.Approve,
            }
            setReviewUpdateId(userReview.id)
            setIsNewReview(false);
            setCheckUserReview(true);
            setDetailReviewRequest(request);
        }

    }, [detailStoreItemInfo, userLoginInfo])


    const openDialogForCreate = () => {
        if (userLoginInfo.id) {
            setDialogVisible(true);
            setIsNewReview(true);
            setDetailReviewRequest({ ...emptyReviewRequestModel, userId: userLoginInfo.id })
        }
        else {
            nav("/auth/login")
        }

    };
    const openDialogForUpdate = (review: IReviewRequestModel) => {
        setDialogVisible(true);
        setIsNewReview(false);
        setDetailReviewRequest(review);
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission for both create and update
        if (isNewReview) {
            const res: IBaseResponseModel = await createNewReviewService(detailReviewRequest);
            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Review created successfully",
                });
                dispatch(getDetailStoreInfo(detailStoreItemInfo.id))
            }
            else {
                setShowModelToast({
                    severity: "error",
                    summary: "Fail",
                    detail: "Review created fail",
                });

            }

        } else {
            const res: IReviewResultResponseModel = await updateReviewService(reviewUpdateId, detailReviewRequest);



            if (res.success) {
                setShowModelToast({
                    severity: "success",
                    summary: "Success",
                    detail: "Review updated successfully",
                });
                dispatch(getDetailStoreInfo(detailStoreItemInfo.id))
            }
            else {
                setShowModelToast({
                    severity: "error",
                    summary: "Fail",
                    detail: "Review updated fail",
                });

            }
        }
        setDialogVisible(false);
    };
    return (
        <>
            <div className="card flex-columns justify-content-center w-full">
                {checkUserReview ? (
                    <Button onClick={() => { openDialogForUpdate(detailReviewRequest) }} icon="pi pi-comments" className="w-full" label="Update your review" severity="help" rounded />
                ) : (
                    <Button onClick={openDialogForCreate} icon="pi pi-comments" className="w-full" label="Write your review here" severity="help" rounded />
                )}
                {/* <Button label="Update Review" onClick={() => openDialogForUpdate(r)} /> */}
                <ReviewListContainer>
                    {detailStoreItemInfo.reviews.length > 0 &&
                        detailStoreItemInfo.reviews.map((r) => (
                            <div key={r.id}>
                                <ReviewItem review={r} />

                            </div>
                        ))}
                </ReviewListContainer>
            </div>

            <Dialog
                visible={dialogVisible}
                header={isNewReview ? "Create Review" : "Update Review"}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                onHide={() => setDialogVisible(false)}
            >
                <form onSubmit={handleSubmit} className="grid p-fluid">
                    <div className="field col-12">
                        <label htmlFor="content">Content</label>
                        <InputTextarea

                            value={detailReviewRequest.content}
                            onChange={(e) => setDetailReviewRequest({ ...detailReviewRequest, content: e.target.value })}
                        />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="ratingValue">Rating</label>
                        <Rating
                            value={detailReviewRequest.ratingValue}
                            onChange={(e) => setDetailReviewRequest({ ...detailReviewRequest, ratingValue: e.value! })}
                        />
                    </div>
                    <div className="field col-12 flex">
                        <Button label="Submit" type="submit" className="mr-2" />
                        <Button label="Cancel" type="button" className="p-button-secondary" onClick={() => setDialogVisible(false)} />
                    </div>
                </form>
            </Dialog>


        </>
    )
}

