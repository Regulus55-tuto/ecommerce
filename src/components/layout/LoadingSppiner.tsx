import React from 'react';
import Lottie from "lottie-react";
import loading1 from '../assets/loading1.json'

interface IProps {
    className?: string;
}

const LoadingSppiner:React.FC<IProps> = ({className}) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Lottie
                animationData={loading1}
                loop={true}
                autoplay={true}
                className={'h-60 w-60 max-w-screen max-h-screen'}
            />
        </div>
    );
};

export default LoadingSppiner;