import React from "react";

export default function Login() {
    return (
        <div className="mt-10">

            <form action="" className="sm:w-96 mx-auto w-fit flex flex-col items-center gap-5 rounded-2xl p-5 bg-gray-300">
                <h4 className="font-bold text-lg">ورود / ثبت نام</h4>
                <input className="w-full rounded-md py-2 px-4 outline-none placeholder:text-right" maxLength={11} dir="ltr" placeholder="شماره تماس" type="text" />
                <button className="bg-green-700 hover:bg-green-800 transition-colors duration-200 w-full text-bgcolor py-2 rounded-md px-4">ارسال کد تایید</button>
            </form>

        </div>
    )
}