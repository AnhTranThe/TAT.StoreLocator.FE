import { Outlet } from "react-router-dom";
import HomeSearch from "../HomeSearch/HomeSearch";

export default function HomeContainer() {
    return (
        <div >
            <HomeSearch />
            <div className="sm:px-3 mx-auto  ">
                <div className=" mx-auto w-full py-5 flex flex-column-reverse md:flex-row justify-content-center sm: px-5  ">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
