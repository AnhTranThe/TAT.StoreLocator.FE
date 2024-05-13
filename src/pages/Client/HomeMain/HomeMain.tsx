import InfoBox from "../InfoBox/InfoBox";
import MapRender from "../MapRender/MapRender";

export default function HomeMain() {
    return (
        <div className="sm:px-3 mx-auto  ">
            <div className=" mx-auto w-full py-5   flex flex-column-reverse md:flex-row justify-content-center gap-2  px-4  ">
                <InfoBox />
                <MapRender />
            </div>

        </div>
    )
}
