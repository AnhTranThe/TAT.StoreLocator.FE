import { useAppSelector } from "../../../hooks/ReduxHook";
import InfoBox from "../InfoBox/InfoBox";
import InfoDetail from "../InfoDetail/InfoDetail";
import MapRender from "../MapRender/MapRender";

export default function SearchBox() {

    const { isActiveInFoDetail }: { isActiveInFoDetail: boolean } = useAppSelector(
        (state) => state.infoDetailReducer
    );


    return (
        <>
            <div className=" md:col-3 pt-0">
                <InfoBox />
            </div>
            {
                isActiveInFoDetail && (
                    <div className={`md:col-4 pt-0`}>
                        <InfoDetail />
                    </div>
                )
            }
            <div className={isActiveInFoDetail ? `md:col-5 pt-0` : `md:col-7 pt-0`}>
                <MapRender />
            </div>

        </>

    )
}
