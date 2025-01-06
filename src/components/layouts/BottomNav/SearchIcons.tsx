"use client"
import { Cover } from "@/components/common/Cover";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";



export const SearchIcons = () => {

    const [isSearchBarShown, setIsSearchBarShown] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const route = useRouter()

    const toggleSearchBarShown = () => {
        setIsSearchBarShown(prev => !prev)
        setSearchQuery('')
    }

    const searchBtnClickHandler = () => {
        searchQuery && route.push(`/search?query=${searchQuery}`)
    }

    return (
        <>
            <div className="z-10 relative -translate-y-5">

                <button onClick={toggleSearchBarShown} className="bg-main  text-bgcolor py-3 px-8 rounded-full m-auto">
                    <FaSearch size={30} />
                </button>

                <div className={`${isSearchBarShown ? '' : 'scale-0 !translate-y-10'} -translate-y-0 transition-transform duration-200 absolute bottom-[130%] left-0 right-0 mx-auto h-full`}>
                    <div className="relative flex justify-center">

                        <div className="w-8 h-8 mx-auto left-0 right-0 rotate-45 absolute -bottom-3 bg-main rounded-md z-0" />
                        <div className="relative">
                            <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value) }} type="text" className="z-10 outline-none p-3 bg-main placeholder-gray-300 pl-8 text-bgcolor rounded-full" placeholder="چه ماشینی میخوای ؟" />
                            <button onClick={searchBtnClickHandler} className="absolute left-2 top-0 bottom-0 my-auto p-0.5 border border-bgcolor h-fit rounded-full">
                                <FaArrowLeft className="text-bgcolor" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            <Cover onClick={toggleSearchBarShown} isActive={isSearchBarShown} />
        </>
    )
};
