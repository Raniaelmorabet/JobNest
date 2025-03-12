 import React from "react";
import Intro from "../../assets/Intro/JobNest.mp4"
function Preloader({ className }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <video autoPlay muted className="w-full h-full object-contain">
                <source src={Intro} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Preloader;
