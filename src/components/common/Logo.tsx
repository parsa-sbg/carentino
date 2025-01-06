import React from "react";
import { Jersey_15 } from 'next/font/google'
import { FaCar } from "react-icons/fa";
import Link from "next/link";

const logoFont = Jersey_15({
    weight: ["400"],
    subsets: ["latin"]
})

export const Logo = () => {
    return (
        <Link href={'/'} className={`${logoFont.className} text-4xl flex items-center gap-1`}>
            carentino
            <FaCar size={25} />
        </Link>
    )
};
