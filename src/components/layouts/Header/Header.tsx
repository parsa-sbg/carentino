import { Logo } from "@/components/common/Logo";
import React from "react";
import { User } from "./User";
import { UserInterface } from "@/models/User";


type headerProps = {
    user: UserInterface | null
}

function Header({ user }: headerProps) {


    return (
        <div className="absolute top-5 hidden sm:flex left-0 right-0 justify-between items-center font-bold bg-main w-full text-bgcolor p-3 rounded-lg bg-opacity-100 backdrop-blur-sm">
            <Logo />
            <User user={JSON.parse(JSON.stringify(user))} />
        </div>
    )
}

export default Header;
