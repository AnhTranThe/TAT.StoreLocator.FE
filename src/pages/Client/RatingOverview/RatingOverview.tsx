import { Rating } from "primereact/rating";
import { useCallback, useContext, useEffect, useState } from "react";
import ProgressBar from "../../../components/Common/ProgressBar";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IPaginationRequestModel } from "../../../models/paginationModel";
import { IBaseReviewFilterRequestModel, IReviewModel, IReviewPaginationResponseModel } from '../../../models/reviewModel';
import { IStoreModel } from "../../../models/storeModel";
import { getListReviewsByStoreService } from "../../../Services/reviewServiceApi";
import { calculateAverageRating } from "../../../utils/Utilities";
import { IToastValueContext, ToastContext } from "../../context/toastContext";

export default function RatingOverview({ type, typeId }: { type: string, typeId: string }) {


    const [listReviews, setListReviews] = useState<IReviewModel[]>([])
    const [countSumRating, setCountSumRating] = useState<number>(0);
    const [countPercentStar5, setCountPercentStar5] = useState<number>(0);
    const [countPercentStar4, setCountPercentStar4] = useState<number>(0);
    const [countPercentStar3, setCountPercentStar3] = useState<number>(0);
    const [countPercentStar2, setCountPercentStar2] = useState<number>(0);
    const [countPercentStar1, setCountPercentStar1] = useState<number>(0);
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )

    const fetchReviewsByStore = useCallback(async (request: IBaseReviewFilterRequestModel) => {

        try {
            const res: IReviewPaginationResponseModel = await getListReviewsByStoreService(request);
            const listReviews = res.data;
            console.log(listReviews);

            setListReviews(listReviews);
            const countStar5 = listReviews.filter(review => review.ratingValue === 5).length;
            const countStar4 = listReviews.filter(review => review.ratingValue === 4).length;
            const countStar3 = listReviews.filter(review => review.ratingValue === 3).length;
            const countStar2 = listReviews.filter(review => review.ratingValue === 2).length;
            const countStar1 = listReviews.filter(review => review.ratingValue === 1).length;
            const totalCount = listReviews.length;
            setCountSumRating(totalCount);
            setCountPercentStar5(parseFloat((countStar5 / totalCount * 100).toFixed(2)));
            setCountPercentStar4(parseFloat((countStar4 / totalCount * 100).toFixed(2)))
            setCountPercentStar3(parseFloat((countStar3 / totalCount * 100).toFixed(2)))
            setCountPercentStar2(parseFloat((countStar2 / totalCount * 100).toFixed(2)))
            setCountPercentStar1(parseFloat((countStar1 / totalCount * 100).toFixed(2)))
        } catch (error) {
            setShowModelToast({
                severity: "error",
                summary: "Error",
                detail: "Failed to fetch reviews",
            });
        }

    }, [setShowModelToast]);
    console.log(listReviews);



    useEffect(() => {
        (async () => {
            let request;
            const paginationRequest: IPaginationRequestModel = {
                pageIndex: 1, // Set your default pageIndex
                pageSize: 10, // Set your default pageSize
                searchString: '' // Set your default search string
            };
            if (type && typeId) {
                request = {
                    ...paginationRequest,
                    type,
                    typeId,

                };
                await fetchReviewsByStore(request as IBaseReviewFilterRequestModel);
            }
        })();


    }, [fetchReviewsByStore, type, typeId])
    return (
        <div className="pt-3  w-full">
            <h5 className="text-center">Summary rating reviews</h5>
            <div className="card flex-columns justify-content-center w-full">
                <div className="grid align-items-center">
                    <div className="col-12 md:col-7">
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-2">
                            <span className="text-xl">5</span>
                            <ProgressBar completed={countPercentStar5} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-2">
                            <span className="text-xl">4</span>
                            <ProgressBar completed={countPercentStar4} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-2">
                            <span className="text-xl">3</span>
                            <ProgressBar completed={countPercentStar3} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-2">
                            <span className="text-xl">2</span>
                            <ProgressBar completed={countPercentStar2} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-2">
                            <span className="text-xl">1</span>
                            <ProgressBar completed={countPercentStar1} />
                        </div>
                    </div>
                    <div className="col-12 md:col-5 flex flex-column justify-content-center align-items-center">
                        <h2 style={{ fontWeight: "bolder" }}>{calculateAverageRating(detailStoreItemInfo.reviews).toFixed(2)}</h2>
                        <Rating value={calculateAverageRating(detailStoreItemInfo.reviews)} readOnly cancel={false} />
                        <p className="pt-4 text-xl">{countSumRating} bài viết</p>
                    </div>


                </div>
            </div>
        </div>
    )
}
