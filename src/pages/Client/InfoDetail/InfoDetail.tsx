import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IGalleryResponseModel } from "../../../models/galleryModel";
import { IStoreResponseModel } from "../../../models/storeModel";
import "./InfoDetail.css";
export default function InfoDetail({ hide }: { hide: () => void }) {
    const [images, setImages] = useState<IGalleryResponseModel[]>([]);
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreResponseModel } = useAppSelector(
        (state) => state.storeReducer
    )
    useEffect(() => {
        setImages(detailStoreItemInfo.galleries)
            ;
    }, []);

    const itemTemplate = (item: IGalleryResponseModel) => {
        return <img className="border-round-2xl" src={item.url} alt={item.id} style={{ width: '100%', height: '10%', display: 'block' }} />;
    }
    return (
        <Card className="relative border-round-2xl h-full" >

            <a className="absolute top-0 right-0 m-2 pi pi-times cursor-pointer text-2xl " onClick={() => hide()} />
            <div className="pt-3">
                <Galleria value={images} style={{ maxWidth: '100%' }} showThumbnails={false} showIndicators showIndicatorsOnItem item={itemTemplate} />
            </div>

        </Card>
    )
}
