import { Rating } from "primereact/rating";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IThemeReducer } from "../../../store/reducer/themeReducer";

export default function InfoItem({ onInfoItemClick }: { onInfoItemClick: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );
    const [isFav, setIsFav] = useState(false);

    return (
        <div onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            onInfoItemClick(e);
        }}
            className={`p-1 surface-card mb-4  cursor-pointer border-round-2xl ${isDarkTheme
                ? "hover-item-dark-effect"
                : "hover-item-light-effect"
                } `}
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
                        <h5>Dia diem</h5>
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
                    <p>Address</p>
                    <p>How far</p>
                    <a className=" flex pb-4 gap-2 ">
                        <Rating value={5} readOnly cancel={false} />
                        (Count)

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
