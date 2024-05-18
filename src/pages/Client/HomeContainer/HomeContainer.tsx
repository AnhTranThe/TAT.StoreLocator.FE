import { Outlet } from "react-router-dom";
import HomeMain from "../HomeMain/HomeMain";
import HomeSearch from "../HomeSearch/HomeSearch";

export default function HomeContainer() {
    return (
        <div >
            <HomeSearch />
            <HomeMain >
                <Outlet />
            </HomeMain>
        </div>
    )
}
