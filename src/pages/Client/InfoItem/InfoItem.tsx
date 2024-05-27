import { Rating } from "primereact/rating";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IStoreModel, IStoreSimpleResponseModel } from "../../../models/storeModel";
import { setActiveInfoDetailAction, setActiveInfoItemAction } from "../../../store/action/infoDetailAction";
import { getDetailStoreInfo } from "../../../store/action/storeAction";
import { IActiveInfoItem } from '../../../store/reducer/infoDetailReducer';
import { IThemeReducer } from "../../../store/reducer/themeReducer";
import { useAppDispatch } from "../../../store/store";
import { calculateAverageRating } from "../../../utils/Utilities";
import './InfoItem.css';

export default function InfoItem({ infoStoreItem }: { infoStoreItem: IStoreModel | IStoreSimpleResponseModel }) {
    //onInfoItemClick: (e: React.MouseEvent<HTMLDivElement>) => void }
    console.log(infoStoreItem);

    const dispatch = useAppDispatch();
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );
    const { activeInfoItem }: { activeInfoItem: IActiveInfoItem } = useAppSelector(
        (state) => state.infoDetailReducer
    );
    const [isFav, setIsFav] = useState(false);

    return (
        <div key={infoStoreItem.id} onClick={() => {
            dispatch(setActiveInfoItemAction(infoStoreItem.id, true))
            dispatch(setActiveInfoDetailAction(true))
            dispatch(getDetailStoreInfo(infoStoreItem.id))
        }}
            className={`p-1 surface-card mb-4  cursor-pointer border-round-2xl ${isDarkTheme
                ? "hover-item-dark-effect"
                : "hover-item-light-effect"
                }
                ${activeInfoItem.itemId === infoStoreItem.id &&
                    activeInfoItem.isActive === true &&
                    isDarkTheme === true
                    ? "active-item-dark-effect"
                    : ""
                }
                  ${activeInfoItem.itemId === infoStoreItem.id &&
                    activeInfoItem.isActive === true &&
                    isDarkTheme === false
                    ? "active-item-light-effect"
                    : ""
                }
                
                 `}
        // ${isActive ? "active-item-light-effect" : ""}
        >
            <div className="flex flex-column md:flex-row ">
                {/* <div
                    className="flex align-items-center justify-content-center md:col-4  "
                >
                    <img className="border-round-xl"
                        src={generateRandomImageProject()}
                        alt="Image"
                        style={{ width: '12rem', height: 'auto' }}

                    />
                </div> */}
                <div className=" col-12 pl-4 py-3   ">
                    <div className="flex justify-content-between relative">
                        <h5>{infoStoreItem.name}</h5>
                        {!isFav ? (
                            <a onClick={(e) => {
                                e.stopPropagation();
                                setIsFav(true)

                            }} className="absolute pi pi-heart top-0 right-0 text-2xl text-red-300" title="Detail" />
                        ) : (
                            <a onClick={(e) => {
                                e.stopPropagation();
                                setIsFav(false)
                            }} className="absolute pi pi-heart-fill top-0 right-0 text-2xl text-red-300" title="Detail" />
                        )}
                    </div>
                    {infoStoreItem.address && (
                        <p>{infoStoreItem.address.roadName}, Ward {infoStoreItem.address.ward}, District {infoStoreItem.address.district}, {infoStoreItem.address.province}</p>
                    )}

                    <a className=" flex pb-4 gap-2 ">
                        <Rating value={calculateAverageRating(infoStoreItem.reviews)} readOnly cancel={false} />
                        ({infoStoreItem.reviews.length})

                    </a>
                    <div className="flex gap-2 ">
                        {/* <Button title="Detail" severity="danger" outlined icon="pi pi-heart" /> */}
                        {/* <Button title="Detail" severity="info" icon="pi pi-ellipsis-h" /> */}
                        {/* <Button title="Detail" severity="secondary" outlined icon="pi pi-map-marker" /> */}
                    </div>
                </div>
            </div>


        </div>
    )
}
