import { Card } from "primereact/card";

export default function InfoDetail({ hide }: { hide: () => void }) {
    return (
        <Card className="relative border-round-2xl h-full" >

            <a className="absolute top-0 right-0 m-2 pi pi-times cursor-pointer text-2xl " onClick={() => hide()} />

            <p>This is the overlay content. It appears when you click on column 1.</p>

        </Card>
    )
}
