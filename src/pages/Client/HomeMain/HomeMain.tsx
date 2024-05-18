import { ReactNode } from "react";
import { useAppSelector } from "../../../hooks/ReduxHook";
import InfoDetail from "../InfoDetail/InfoDetail";
import MapRender from "../MapRender/MapRender";
import './HomeMain.css';

export default function HomeMain({ children }: { children: ReactNode }) {
    const { isActiveInFoDetail }: { isActiveInFoDetail: boolean } = useAppSelector(
        (state) => state.infoDetailReducer
    );

    return (
        <div className="sm:px-3 mx-auto  ">
            <div className=" mx-auto w-full py-5 flex flex-column-reverse md:flex-row justify-content-center sm: px-5  ">
                {children}
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


            </div>
        </div>
    )
}
