import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import { useEffect, useRef, useState } from "react";
import {
    AttributionControl,
    FullscreenControl,
    GeolocateControl,
    Map,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl
} from "react-map-gl";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { IGeolocation } from "../../../models/addressModel";
import { IStorePaginationResponseModel, IStoreSimpleResponseModel } from "../../../models/storeModel";
import { getReverseGeocodingService } from "../../../Services/locationServiceApi";
import { emptyStoreSimple } from "../../../store/reducer/storeReducer";
import { IThemeReducer } from "../../../store/reducer/themeReducer";
import { calculateAverageRating } from "../../../utils/Utilities";



export default function MapRender() {
    const geoControlRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState<IGeolocation | null>(null);
    const { isDarkTheme }: { isDarkTheme: boolean } = useAppSelector(
        (state: IThemeReducer) => state.themeReducer
    );
    const { listStoresNear }: { listStoresNear: IStorePaginationResponseModel } = useAppSelector(
        (state) => state.storeReducer
    );

    // const [selectedLocation, setSelectedLocation] = useState<IGeolocation>(emptySelectedLocation);
    const [selectedStore, setSelectedStore] = useState<IStoreSimpleResponseModel>(emptyStoreSimple);
    const [isShowPopUp, setIsShowPopUp] = useState(false);


    const handleGetCurrentLocation = () => {
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
    }

    // const handleGetListLocations = () => {
    //     if (listStoresNear.data.length > 0) {
    //         const updatedLocations: IGeolocation[] = listStoresNear.data.map((store: IStoreSimpleResponseModel) => ({
    //             latitude: store.address && store.address.latitude,
    //             longitude: store.address && store.address.longitude
    //         }));
    //         setListLocations(updatedLocations);
    //     }
    // }


    useEffect(() => {
        handleGetCurrentLocation();

    }, [listStoresNear]);

    console.log(selectedStore);



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
                {listStoresNear.data.map((result: IStoreSimpleResponseModel, index) => (
                    <div key={result.address?.latitude}>
                        <Marker
                            key={index}
                            latitude={result.address?.latitude ?? 0}
                            longitude={result.address?.longitude ?? 0}
                            offset={[-20, -10]}
                            onClick={() => {
                                setSelectedStore(result)
                                setIsShowPopUp(true)
                            }}
                        >
                            <p
                                role="img"
                                className="cursor-pointer text-2xl animate-bounce"
                                aria-label="push-pin"
                            >
                                📌
                            </p>
                        </Marker>

                        {isShowPopUp && selectedStore?.address?.latitude === result.address?.latitude && selectedStore.address?.longitude === result.address?.longitude ? (
                            <Popup
                                latitude={selectedStore.address?.latitude ?? 0}
                                longitude={selectedStore.address?.longitude ?? 0}
                                closeButton={true}
                                onClose={() => {
                                    setSelectedStore(emptyStoreSimple)
                                }}
                                anchor="top"
                                closeOnClick={false}
                            >
                                <div className="flex px-2 surface-card">
                                    <div className="h-20rem w-20rem">
                                        <div className="w-full ">
                                            <Image src={selectedStore.images && selectedStore.images.length > 0 ? selectedStore.images[0].url : ''} alt="Image" width="100%" />
                                            <h6 className="">{selectedStore.address?.roadName}, {selectedStore.address?.province}</h6>
                                        </div>
                                        <div className="flex justify-content-between ">
                                            <p className="flex items-center">
                                                <a className="flex pb-4 gap-2">
                                                    <Rating value={selectedStore.reviews && calculateAverageRating(selectedStore.reviews)} readOnly cancel={false} />
                                                    ({selectedStore.reviews?.length})
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Popup>

                        ) : (
                            false
                        )}

                    </div>


                ))}


                {/* {selectedStore && (
                   
                )} */}

                <GeolocateControl ref={geoControlRef} />
                <FullscreenControl />
                <NavigationControl />
                <ScaleControl />
                <AttributionControl customAttribution="Developed by The Anh" />

            </Map >

        </>
    )
}
