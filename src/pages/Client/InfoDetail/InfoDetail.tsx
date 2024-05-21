import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { MenuItem } from "primereact/menuitem";
import { Rating } from "primereact/rating";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IGalleryModel } from "../../../models/galleryModel";
import { IStoreModel } from "../../../models/storeModel";
import { setActiveInfoDetailAction, setActiveInfoItemAction } from "../../../store/action/infoDetailAction";
import { useAppDispatch } from "../../../store/store";
import InfoDetailOverview from "../InfoDetailOverview/InfoDetailOverview";
import InfoDetailReview from "../InfoDetailReview/InfoDetailReview";
import "./InfoDetail.css";
export default function InfoDetail() {
    //{ hide }: { hide: () => void }
    const [images, setImages] = useState<IGalleryModel[]>([]);
    const [isFav, setIsFav] = useState(false);
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )
    const dispatch = useAppDispatch()
    const [activeTabMenuIndex, setActiveTabMenuIndex] = useState<number>(0);
    useEffect(() => {
        detailStoreItemInfo.galleries && setImages(detailStoreItemInfo.galleries);

    }, []);


    const itemTemplate = (item: IGalleryModel) => {
        return <img className="border-round-2xl " src={item.url} alt={item.id} style={{ width: '100%', display: "block" }} />;
    }

    const tabMenuItems: MenuItem[] = [
        {
            label: 'Overview',
            command: () => setActiveTabMenuIndex(0)
        },
        {
            label: 'Reviews',
            command: () => setActiveTabMenuIndex(1)
        }
    ];
    return (
        <Card className="relative border-round-2xl h-full" >

            <a className="absolute top-0 right-0 m-2 pi pi-times cursor-pointer text-2xl " onClick={() => {
                dispatch(setActiveInfoDetailAction(false))
                dispatch(setActiveInfoItemAction("", false))
            }} />
            {/* <Galleria value={images} style={{ maxWidth: '100%' }} showThumbnails={false} showIndicators showIndicatorsOnItem item={itemTemplate} /> */}
            <Galleria value={images} style={{ maxWidth: '100%' }} showThumbnails={false} showIndicators
                showIndicatorsOnItem={true} indicatorsPosition={"bottom"} item={itemTemplate} />
            <div className="card mt-3">
                <div className="pt-2 flex justify-content-between">
                    <h4>{detailStoreItemInfo.name}</h4>
                    {!isFav ? (
                        <a onClick={() => {
                            setIsFav(true)
                        }} className=" pi pi-bookmark text-2xl text-blue-300" title="Detail" />
                    ) : (
                        <a onClick={() => {
                            setIsFav(false)
                        }} className=" pi pi-bookmark-fill top-0 right-0 text-2xl text-blue-300" title="Detail" />
                    )}

                </div>
                <div className="pt-2 flex gap-2 ">
                    <Rating value={detailStoreItemInfo.averageRating} readOnly cancel={false} />
                    ({detailStoreItemInfo.averageRating})
                </div>
                <div className="pt-2 flex gap-2  ">
                    <TabMenu className="mt-2" activeIndex={activeTabMenuIndex} onTabChange={(e) => setActiveTabMenuIndex(e.index)} model={tabMenuItems} />
                </div>
                <div className="pt-2 flex gap-2  ">
                    {activeTabMenuIndex === 0 && <InfoDetailOverview />}
                    {activeTabMenuIndex === 1 && <InfoDetailReview />}

                </div>
            </div>

        </Card>
    )
}
