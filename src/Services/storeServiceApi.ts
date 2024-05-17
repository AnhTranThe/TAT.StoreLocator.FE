import { IReviewResponseModel } from "../models/reviewModel";
import { IStoreResponseModel } from "../models/storeModel";

export const calAverageRatingValueFunc = (arrRating: number[]) => {
  if (arrRating.length === 0) {
    return 0;
  }
  const sum = arrRating.reduce(
    (total, currentValue) => total + currentValue,
    0
  );
  const avgRating = sum / arrRating.length;
  return avgRating;
};
const calculateAverageRating = (reviews: IReviewResponseModel[]): number => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce(
    (sum, review) => sum + review.ratingValue,
    0
  );
  return totalRating / reviews.length;
};
export const updateStoresWithAverageRating = (
  stores: IStoreResponseModel[]
): IStoreResponseModel[] => {
  return stores.map((store) => ({
    ...store,
    averageRating: calculateAverageRating(store.reviews),
  }));
};
