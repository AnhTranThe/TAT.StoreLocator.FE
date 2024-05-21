import { useEffect, useRef, useState } from "react";
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
import { IGeolocation } from "../../../models/addressModel";
import { getReverseGeocodingService } from "../../../Services/locationServiceApi";
export default function MapRender() {
    const geoControlRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState<IGeolocation | null>(null);
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude }: { latitude: number, longitude: number } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    localStorage.setItem("currentLocation", JSON.stringify({ latitude, longitude }));
                    getReverseGeocodingService({ latitude, longitude })
                },
                (error) => {
                    console.error("Error fetching geolocation: ", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <>
            <Map
                mapStyle={
                    !isDarkTheme
                        ? "mapbox://styles/mapbox/streets-v12"
                        : "mapbox://styles/mapbox/navigation-night-v1"
                }
                style={{ width: "100%", height: "100vh", borderRadius: "20px" }}
                initialViewState={{
                    latitude: currentLocation ? currentLocation.latitude : 10.762463,
                    longitude: currentLocation ? currentLocation.longitude : 106.643850,
                    zoom: 10,
                }}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            >
                <GeolocateControl ref={geoControlRef} />
                <FullscreenControl />
                <NavigationControl />
                <ScaleControl />
                <AttributionControl customAttribution="Developed by The Anh" />

            </Map>

        </>
    )
}
