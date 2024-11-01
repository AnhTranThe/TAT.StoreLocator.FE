import { useAppSelector } from "../../../hooks/ReduxHook";
import { IStorePaginationResponseModel } from "../../../models/storeModel";
import InfoItem from "../InfoItem/InfoItem";
import './InfoBox.css';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InfoBox() {
    // const [listStores, setListStores] = useState<IStoreModel[]>([]);
    const { listStoresNear }: { listStoresNear: IStorePaginationResponseModel } = useAppSelector(
        (state) => state.storeReducer
    );


    // useEffect(() => {
    //     const updatedStores = updateStoresWithAverageRating(sampleListStores);
    //     dispatch(getListStoreItemsBySearchKeyAction(updatedStores))
    // }, [])



    return (
        <>
            <div style={{ maxHeight: '100vh', }} className="p-3 flex flex-column border-200   border-2 hover:border-primary transition-duration-300 transition-all border-round-2xl  overflow-hidden ">
                <h3 className="text-900 text-center my-5">List Store Available</h3>
                <div className="flex flex-column overflow-y-auto custom-scrollbar p-2 " style={{ maxHeight: 'calc(100% - 3rem)' }}>
                    {listStoresNear.data && listStoresNear.data.length > 0 ? (
                        listStoresNear.data.map(store => (
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
