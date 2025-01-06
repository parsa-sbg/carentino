import React from "react";

type props = {
    onClick?: () => void,
    isActive?: boolean
}

export const Cover = ({ onClick, isActive }: props) => {
    return (
        <div onClick={onClick} className={`${isActive ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-200 fixed top-0 left-0 bottom-0 right-0 bg-darkcolor bg-opacity-70`}></div>
    )
};
