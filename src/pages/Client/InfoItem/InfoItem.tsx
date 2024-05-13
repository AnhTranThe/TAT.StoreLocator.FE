import { Button } from "primereact/button";
import { useAppSelector } from "../../../hooks/ReduxHook";
import { generateRandomImageProject } from "../../../utils/Utilities";

export default function InfoItem() {
    const { IsDarkTheme }: { IsDarkTheme: boolean } = useAppSelector(
        (state) => state.themeReducer
    );
    return (
        <div
            className={`p-3  surface-card  cursor-pointer border-round-2xl   ${IsDarkTheme
                ? "hover-item-dark-effect"
                : "hover-item-light-effect"
                } `}
        >
            <div className="flex">
                <div
                    className="flex align-items-center justify-content-center col-5  "
                >
                    <img className="border-round-xl"
                        src={generateRandomImageProject()}
                        alt="Image"
                        style={{ maxWidth: '100%', height: 'auto' }}

                    />
                </div>
                <div className="col-6 ">
                    <div className="flex justify-content-between">
                        <h5>Dia diem</h5>
                    </div>
                    <p>Address</p>
                    <div className="flex gap-2 ">
                        <Button title="Detail" severity="danger" outlined icon="pi pi-heart" />
                        <Button title="Detail" severity="info" icon="pi pi-ellipsis-h" />
                        <Button title="Detail" severity="secondary" outlined icon="pi pi-map-marker" />
                    </div>
                </div>
            </div>
        </div>
    )
}
