import { Card } from "primereact/card";
import { MenuItem } from "primereact/menuitem";
import { Rating } from "primereact/rating";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IStoreModel } from "../../../models/storeModel";
import { setActiveInfoDetailAction, setActiveInfoItemAction } from "../../../store/action/infoDetailAction";
import { useAppDispatch } from "../../../store/store";
import InfoDetailOverview from "../InfoDetailOverview/InfoDetailOverview";
import InfoDetailReview from "../InfoDetailReview/InfoDetailReview";
import "./InfoDetail.css";
import { calculateAverageRating } from "../../../utils/Utilities";
export default function InfoDetail() {

    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )
    const dispatch = useAppDispatch()
    const [activeTabMenuIndex, setActiveTabMenuIndex] = useState<number>(0);

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


            <div className="card mt-3">
                <div className="pt-2 flex justify-content-between">
                    <h4>{detailStoreItemInfo.name}</h4>


                </div>
                <div className="pt-2 flex gap-2 ">
                    <Rating value={calculateAverageRating(detailStoreItemInfo.reviews)} readOnly cancel={false} />
                    ({detailStoreItemInfo.reviews.length})


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
