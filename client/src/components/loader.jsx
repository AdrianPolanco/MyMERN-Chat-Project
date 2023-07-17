import { useState } from "react";

const Loader = () => {
    return (
        <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center z-[999]">
            <div className="h-10 w-10 border-4 bg-gray-400 border-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
