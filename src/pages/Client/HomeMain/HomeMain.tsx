import { useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import InfoDetail from "../InfoDetail/InfoDetail";
import MapRender from "../MapRender/MapRender";
import './HomeMain.css';

export default function HomeMain() {
    const [showInfoDetailPopup, setShowInfoDetailPopup] = useState(false);
    const handleShowInfoDetailPopup = () => {
        setShowInfoDetailPopup(true);
    }
    const handleHideInfoDetailPopup = () => {
        setShowInfoDetailPopup(false);
    }
    return (
        <div className="sm:px-3 mx-auto  ">
            <div className=" mx-auto w-full py-5 flex flex-column-reverse md:flex-row justify-content-center sm: px-5  ">
                <div className=" md:col-3 pt-0">
                    <InfoBox onInfoItemClick={handleShowInfoDetailPopup} />
                </div>
                {showInfoDetailPopup && (
                    <div className={`md:col-4 pt-0`}>
                        <InfoDetail hide={handleHideInfoDetailPopup} />
                    </div>
                )}
                <div className={showInfoDetailPopup ? `md:col-5 pt-0` : `md:col-7 pt-0`}>
                    <MapRender />
                </div>


            </div>
        </div>
    )
}
