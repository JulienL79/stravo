import { useEffect, useState } from 'react';
import './InitialLoader.css'

export const InitialLoader = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }, []);

    return (
        <div className={`initial-loader ${visible ? "show" : "hide"}`}>
            <span>S</span>
        </div>
    );
};
