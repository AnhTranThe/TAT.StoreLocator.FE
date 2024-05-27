import { useAppSelector } from "../../../hooks/ReduxHook";
import { IStoreModel } from "../../../models/storeModel";
import RatingOverview from "../RatingOverview/RatingOverview";

export default function InfoDetailOverview() {
    const { detailStoreItemInfo }: { detailStoreItemInfo: IStoreModel } = useAppSelector(
        (state) => state.storeReducer
    )


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
            <RatingOverview typeId={detailStoreItemInfo.id} type="store" />

        </div>

    )
}
