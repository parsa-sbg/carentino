"use client"
import { UserInterface } from "@/models/User";
import { useUserStore } from "@/zustand/userStore";

import Link from "next/link";
import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

type props = {
    user: UserInterface | null
}

export const User = ({ user: intialUser }: props) => {


    const { setUser, user } = useUserStore()

    useEffect(() => {
        setUser(intialUser)
    }, [])

    return (
        <div className="group relative">

            <div className="flex items-center gap-0.5 cursor-pointer">
                حساب من
                <IoIosArrowBack className="group-hover:-rotate-90 transition-transform duration-300" strokeWidth={40} />
            </div>

            <div className="absolute top-full left-0">
                <div className="max-h-0 overflow-hidden mt-2 group-hover:max-h-40 group-hover:p-3 w-fit relative transition-all duration-300 rounded-lg rounded-tl-sm bg-darkcolor">
                    {!user
                        ? (
                            <Link className="text-nowrap transition-colors duration-300 hover:text-main" href={'/login'}>ورود/ثبت نام</Link>
                        )
                        : (
                            <div className="flex flex-col gap-2">
                                <span className="text-nowrap pb-1 border-b">{user.phone}</span>
                                <Link className="text-nowrap transition-colors duration-300 hover:text-main" href={'/dashboard/reservations'}>رزرو های من</Link>
                                <Link className="text-nowrap transition-colors duration-300 hover:text-main" href={'/dashboard/account'}>اطلاعات حساب</Link>
                            </div>
                        )}
                </div>

            </div>

        </div>
    )
};
