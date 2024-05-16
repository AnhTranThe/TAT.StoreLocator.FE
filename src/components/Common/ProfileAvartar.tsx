import { Avatar } from "primereact/avatar";

export default function ProfileAvartar({ size, userName }: { size?: "normal" | "large" | "xlarge" | undefined, userName: string }) {

    const firstCharacter = userName.charAt(0).toUpperCase();
    return (
        <Avatar
            label={firstCharacter}
            className="p-mr-2 mr-2"
            size={size}
            shape="circle"
            style={{
                backgroundColor: 'blue',
                color: 'white',
                ...(size === 'xlarge' && { width: '8rem', height: "8rem" })
            }}
        />
    )
}
