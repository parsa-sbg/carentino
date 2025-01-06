import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { SearchIcons } from "./SearchIcons";


export const BottomNav = () => {
    return (
        <div className="fixed sm:hidden bottom-0 left-0 right-0 py-1 bg-white items-center">
            <div className="flex">
                <button className="basis-full flex items-center justify-center">
                    <GrHomeRounded size={30} />
                </button>

                <SearchIcons />

                <button className="basis-full flex items-center justify-center">
                    <FaRegUserCircle size={30} />
                </button>
            </div>
        </div>

    )
};
