import { useCallback, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProgressBar = (props: any) => {
    const { completed } = props;
    const [bgColor, setBgColor] = useState<string>("");

    const updateBgColor = useCallback((value: string) => {
        setBgColor(value);
    }, []);
    useEffect(() => {
        if (completed > 70 && completed < 100) {
            updateBgColor("#2DAB7E");
        } else if (completed > 30 && completed < 70) {
            updateBgColor("#F2CA27");
        } else if (completed > 10 && completed < 30) {
            updateBgColor("#dc5d33");
        } else if (completed > 0 && completed < 10) {
            updateBgColor("#d30101");
        } else {
            updateBgColor("");
        }
    }, [completed, updateBgColor])
    const containerStyles: React.CSSProperties = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
    }

    const fillerStyles: React.CSSProperties = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    }
    const labelStyles: React.CSSProperties = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;