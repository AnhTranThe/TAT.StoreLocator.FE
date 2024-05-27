import styled from 'styled-components';
import { IReviewModel } from '../../../models/reviewModel';
import './ReviewItem.css';

export default function ReviewItem({ review }: { review: IReviewModel }) {


    const ReviewItemContainer = styled.div`
    border-bottom: 1px solid #e9ecef;
    padding: 10px 0;

    &:last-child {
        border-bottom: none;
    }
`;

    const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    h3 {
        margin: 0;
        font-size: 1.2em;
        color: #343a40;
    }
`;
    const ReviewRating = styled.div`
    color: #ffcc00; /* Gold color for stars */
`;

    const ReviewContent = styled.p`
    margin: 0;
    font-size: 1em;
    color: #495057;
`;

    return (
        <ReviewItemContainer>
            <ReviewHeader>
                <h3>{review.userEmail}</h3>
                <ReviewRating>
                    {'⭐'.repeat(review.ratingValue)}
                </ReviewRating>
            </ReviewHeader>
            <ReviewContent>{review.content}</ReviewContent>
        </ReviewItemContainer>
    )
}
