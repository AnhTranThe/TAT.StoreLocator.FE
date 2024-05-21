import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import ProgressBar from "../../../components/Common/ProgressBar";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IProductModel } from "../../../models/productModel";
import { IStoreModel } from "../../../models/storeModel";
import { formatCurrencyPriceVnd } from "../../../utils/Utilities";

export default function InfoDetailOverview() {
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )

    const [listProducts, setListProducts] = useState<IProductModel[]>([]);

    const [countSumRating, setCountSumRating] = useState<number>(0);
    const [countPercentStar5, setCountPercentStar5] = useState<number>(0);
    const [countPercentStar4, setCountPercentStar4] = useState<number>(0);
    const [countPercentStar3, setCountPercentStar3] = useState<number>(0);
    const [countPercentStar2, setCountPercentStar2] = useState<number>(0);
    const [countPercentStar1, setCountPercentStar1] = useState<number>(0);

    //console.log(detailStoreItemInfo);
    useEffect(() => {
        detailStoreItemInfo.products && setListProducts(detailStoreItemInfo.products.slice(0, 9));
    }, []);
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

    const getSeverity = (product: IProductModel) => {
        switch (true) {
            case (product.quantity && product.quantity > 0):
                return 'success';
            case (product.quantity && product.quantity === 0):
                return 'warning';
            default:
                return null;
        }
    };
    const productTemplate = (product: IProductModel) => {
        return (
            <div className=" border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img
                        style={{ objectFit: "contain", display: "block", width: "100%", height: "100%" }}
                        src={product.galleries && product.galleries.find(t => t.isThumbnail === true)?.url}
                        alt={product.name ?? ""}
                        className="w-full h-full shadow-2"
                    />
                </div>
                <div>
                    <h4 className="mb-3">{product.name}</h4>
                    {
                        product.category && <h6 className="mt-0 mb-3">{product.category.name}</h6>
                    }

                    {
                        product.price && <h6 className="mt-0 mb-3">{formatCurrencyPriceVnd(product.price)}</h6>
                    }
                    {
                        !product.price && <h6 className="mt-0 mb-3">{formatCurrencyPriceVnd(0)}</h6>
                    }
                    {
                        product.quantity && product.quantity > 0 && (<Tag className="mt-0 mb-3" value="IN STOCK" severity={getSeverity(product)}></Tag>)
                    }
                    {
                        product.quantity && product.quantity == 0 && (<Tag className="mt-0 mb-3" value="OUT STOCK" severity={getSeverity(product)}></Tag>)
                    }
                    <div className=" mt-0 mb-3 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        {/* <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" /> */}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            <div className="py-4  w-full border-bottom-2 surface-border">
                <div className="flex   gap-3 flex-grow-1">
                    <i className="pi pi-map-marker px-3 " style={{ color: 'green', fontSize: '1.5rem', display: 'inline-block', paddingTop: '0.2rem' }}></i>
                    <p className="text-xl " style={{ wordWrap: 'break-word', display: 'inline-block', lineHeight: '2rem' }}>{detailStoreItemInfo.address.roadName}, Ward {detailStoreItemInfo.address.ward}, District {detailStoreItemInfo.address.district}, {detailStoreItemInfo.address.province}</p>
                </div>
                <div className="flex  gap-3 flex-grow-1 pt-3">
                    <i className="pi pi-envelope px-3" style={{ color: 'green', fontSize: '1.5rem', display: 'inline-block', paddingTop: '0.2rem' }}></i>
                    <p className="text-xl" style={{ wordWrap: 'break-word', display: 'inline-block', lineHeight: '2rem' }}>{detailStoreItemInfo.email}</p>
                </div>
                <div className="flex  gap-3 flex-grow-1 pt-3">
                    <i className="pi pi-phone px-3" style={{ color: 'green', fontSize: '1.5rem', display: 'inline-block', paddingTop: '0.2rem' }}></i>
                    <p className="text-xl" style={{ wordWrap: 'break-word', display: 'inline-block', lineHeight: '2rem' }}>{detailStoreItemInfo.phoneNumber}</p>
                </div>
            </div>
            <div className="pt-3  w-full">
                <h5 className="text-center">Summary rating reviews</h5>
                <div className="card flex-columns justify-content-center w-full">
                    <div className="grid align-items-center">
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
                </div>
            </div>
            <div className="pt-3  w-full  surface-border border-bottom-2">
                <h5 className="text-center">List products available</h5>
                <Carousel value={listProducts} numScroll={1} numVisible={1} orientation="vertical" itemTemplate={productTemplate} verticalViewPortHeight="38rem"
                />
            </div>

        </div>

    )
}
