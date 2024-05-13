import { useRef } from "react";
import {
    AttributionControl,
    FullscreenControl,
    GeolocateControl,
    Map,
    NavigationControl,
    ScaleControl,
} from "react-map-gl";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IThemeReducer } from "../../../store/reducer/themeReducer";
export default function MapRender() {
    const geoControlRef = useRef(null);
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );




    return (
        <div className="md:col-8 pt-0   " >
            <Map
                mapStyle={
                    !isDarkTheme
                        ? "mapbox://styles/mapbox/streets-v12"
                        : "mapbox://styles/mapbox/navigation-night-v1"
                }
                style={{ width: "100%", height: "100vh", borderRadius: "20px" }}
                initialViewState={{ latitude: 23.7607, longitude: 90.3914, zoom: 10 }}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}

            >
                <GeolocateControl ref={geoControlRef} />
                <FullscreenControl />
                <NavigationControl />
                <ScaleControl />
                <AttributionControl customAttribution="Developed by Inzamam" />

            </Map>

        </div>
    )
}
