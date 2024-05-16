import InfoItem from "../InfoItem/InfoItem";
import './InfoBox.css';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InfoBox({ onInfoItemClick }: { onInfoItemClick: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    return (

        <>
            <div style={{ maxHeight: '100vh', }} className="p-3 flex flex-column border-200   border-2 hover:border-primary transition-duration-300 transition-all border-round-2xl  overflow-hidden ">
                <h3 className="text-900 text-center my-5">List Store Available</h3>
                <div className="flex flex-column overflow-y-auto custom-scrollbar p-2 " style={{ maxHeight: 'calc(100% - 3rem)' }}>
                    <InfoItem onInfoItemClick={onInfoItemClick} />
                    <InfoItem onInfoItemClick={onInfoItemClick} />
                    <InfoItem onInfoItemClick={onInfoItemClick} />
                    <InfoItem onInfoItemClick={onInfoItemClick} />
                    <InfoItem onInfoItemClick={onInfoItemClick} />
                    <InfoItem onInfoItemClick={onInfoItemClick} />
                </div>

            </div>

        </>


    )
}
