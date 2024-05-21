import { useEffect, useState } from "react";
import { IStoreModel } from "../../../models/storeModel";
import { useAppSelector } from "../../../hooks/ReduxHook";
import ProgressBar from "../../../components/Common/ProgressBar";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";

export default function InfoDetailReview() {
    //console.log(detailStoreItemInfo);
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )

    const [countSumRating, setCountSumRating] = useState<number>(0);
    const [countPercentStar5, setCountPercentStar5] = useState<number>(0);
    const [countPercentStar4, setCountPercentStar4] = useState<number>(0);
    const [countPercentStar3, setCountPercentStar3] = useState<number>(0);
    const [countPercentStar2, setCountPercentStar2] = useState<number>(0);
    const [countPercentStar1, setCountPercentStar1] = useState<number>(0);

    useEffect(() => {
        if (detailStoreItemInfo.reviews) {
            const countStar5 = detailStoreItemInfo.reviews.filter(review => review.ratingValue === 5).length;
            const countStar4 = detailStoreItemInfo.reviews.filter(review => review.ratingValue === 4).length;
            const countStar3 = detailStoreItemInfo.reviews.filter(review => review.ratingValue === 3).length;
            const countStar2 = detailStoreItemInfo.reviews.filter(review => review.ratingValue === 2).length;
            const countStar1 = detailStoreItemInfo.reviews.filter(review => review.ratingValue === 1).length;
            const totalCount = detailStoreItemInfo.reviews.length;
            setCountSumRating(totalCount);
            setCountPercentStar5((countStar5 / totalCount) * 100)
            setCountPercentStar4((countStar4 / totalCount) * 100)
            setCountPercentStar3((countStar3 / totalCount) * 100)
            setCountPercentStar2((countStar2 / totalCount) * 100)
            setCountPercentStar1((countStar1 / totalCount) * 100)
        }
    }, [])
    return (
        <>
            <div className="card flex-columns justify-content-center w-full">
                <div className="grid align-items-center pb-3 ">
                    <div className="col-12 md:col-7">
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-3">
                            <span className="text-xl">5</span>
                            <ProgressBar completed={countPercentStar5} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-3">
                            <span className="text-xl">4</span>
                            <ProgressBar completed={countPercentStar4} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-3">
                            <span className="text-xl">3</span>
                            <ProgressBar completed={countPercentStar3} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-3">
                            <span className="text-xl">2</span>
                            <ProgressBar completed={countPercentStar2} />
                        </div>
                        <div className="flex w-full justify-content-center align-items-center gap-3 py-3">
                            <span className="text-xl">1</span>
                            <ProgressBar completed={countPercentStar1} />
                        </div>
                    </div>
                    <div className="col-12 md:col-5 flex flex-column justify-content-center align-items-center">
                        <h2 style={{ fontWeight: "bolder" }}>{detailStoreItemInfo.averageRating}</h2>
                        <Rating value={detailStoreItemInfo.averageRating} readOnly cancel={false} />
                        <p className="pt-4 text-xl">{countSumRating} bài viết</p>
                    </div>
                </div>
                <div>
                    <Button icon="pi pi-comments" className="w-full" label="Write your reviews here" severity="help" rounded />
                </div>



            </div>
        </>
    )
}
