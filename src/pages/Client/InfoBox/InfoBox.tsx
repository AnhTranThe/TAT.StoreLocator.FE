import { useEffect } from "react";
import { sampleListStores } from "../../../data/mockData";
import { updateStoresWithAverageRating } from "../../../Services/storeServiceApi";
import { getListStoreItemsBySearchKeyAction } from "../../../store/action/storeAction";
import { useAppDispatch } from "../../../store/store";
import InfoItem from "../InfoItem/InfoItem";
import './InfoBox.css';
import { IStoreModel } from "../../../models/storeModel";
import { useAppSelector } from "../../../hooks/ReduxHook";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InfoBox() {
    // const [listStores, setListStores] = useState<IStoreModel[]>([]);
    const dispatch = useAppDispatch();
    const { listStoreItemBySearchKey }: { listStoreItemBySearchKey: IStoreModel[] } = useAppSelector(
        (state) => state.storeReducer
    );

    useEffect(() => {
        const updatedStores = updateStoresWithAverageRating(sampleListStores);
        dispatch(getListStoreItemsBySearchKeyAction(updatedStores))
    }, [])



    return (
        <>
            <div style={{ maxHeight: '100vh', }} className="p-3 flex flex-column border-200   border-2 hover:border-primary transition-duration-300 transition-all border-round-2xl  overflow-hidden ">
                <h3 className="text-900 text-center my-5">List Store Available</h3>
                <div className="flex flex-column overflow-y-auto custom-scrollbar p-2 " style={{ maxHeight: 'calc(100% - 3rem)' }}>
                    {listStoreItemBySearchKey.length > 0 ? (
                        listStoreItemBySearchKey.map(store => (
                            <InfoItem key={store.id} infoStoreItem={store} />
                        ))
                    ) : (
                        <p>No stores found.</p>
                    )}

                </div>

            </div>

        </>


    )
}
