import { Button } from "primereact/button";
import styled from "styled-components";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IStoreModel } from "../../../models/storeModel";
import ReviewItem from "../ReviewItem/ReviewItem";

export default function InfoDetailReview() {
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )
    const ReviewListContainer = styled.div`
    width: 100%;
    margin: 20px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

    return (
        <>
            <div className="card flex-columns justify-content-center w-full">
                <Button icon="pi pi-comments" className="w-full" label="Write your reviews here" severity="help" rounded />
                {
                    <ReviewListContainer>
                        {detailStoreItemInfo.reviews.length > 0
                            && detailStoreItemInfo.reviews.map(r => (
                                <ReviewItem review={r} />
                            ))}
                    </ReviewListContainer>
                }
            </div>

        </>
    )
}
