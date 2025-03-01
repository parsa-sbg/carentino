"use client"
import { sentOtpAction } from "@/actions/auth";
import { otpSchema } from "@/validations/otpSchema";
import { phoneSchema } from "@/validations/phoneSchema";
import { useUserStore } from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {


    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState<1 | 2>(1)
    const route = useRouter()
    const { setUser } = useUserStore()
    const [loading, setLoading] = useState(false)

    const submitHandler = async () => {
        const parsedPhone = phoneSchema.safeParse(phone)

        if (!parsedPhone.success) {

            toast.error(parsedPhone.error.issues[0].message, {
                position: 'top-left',
                duration: 1500
            })
            return
        }
        setLoading(true)
        const result = await sentOtpAction(phone)

        if (!result.success) {
            toast.error(result.message, {
                position: 'top-left',
                duration: 1500
            })
        } else {
            toast.success(result.message, {
                position: 'top-left',
                duration: 1500
            })
            setStep(2)
        }
        setLoading(false)

    }

    const login = async () => {

        const parsedOtp = otpSchema.safeParse(otp)

        if (!parsedOtp.success) {

            toast.error(parsedOtp.error.issues[0].message, {
                position: 'top-left',
                duration: 1500
            })
            return
        }
        setLoading(true)

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                otp,
                phone
            })
        })
        const data = await res.json()


        switch (res.status) {

            case 200: {
                setUser(data.user)
                toast.success('ورود با موفقیت انجام شد', {
                    position: 'top-left',
                    duration: 1500
                })
                route.replace('/dashboard')
                break
            }

            case 500: {
                toast.error('خطای سرور !', {
                    position: 'top-left',
                    duration: 1500
                })
                break
            }

            case 401: {
                toast.error('کد یکبار مصرف صحیح نیست .', {
                    position: 'top-left',
                    duration: 1500
                })
                break
            }
        }
        setLoading(false)

    }

    return (
        <div className="mt-10">

            <form action="" className="sm:w-96 mx-auto w-fit flex flex-col items-center gap-5 rounded-2xl p-5 bg-gray-300">
                <h4 className="font-bold text-lg">ورود / ثبت نام</h4>
                {step == 1
                    ? <input value={phone} onChange={e => { setPhone(e.target.value) }} className="w-full rounded-md py-2 px-4 outline-none placeholder:text-right" maxLength={11} dir="ltr" placeholder="شماره تماس" type="text" />
                    : <input value={otp} onChange={e => { setOtp(e.target.value) }} className="w-full rounded-md py-2 px-4 outline-none placeholder:text-right" maxLength={5} dir="ltr" placeholder="کد پیامک شده" type="text" />
                }

                {step == 1
                    ? <button disabled={loading} onClick={submitHandler} type="button" className="disabled:hover:bg-gray-400 disabled:bg-gray-400 h-10 bg-green-700 hover:bg-green-800 transition-colors duration-200 w-full text-bgcolor py-2 rounded-md px-4">
                        {loading
                            ? (
                                <div className='flex gap-2 justify-center items-center'>
                                    <div className='h-2 w-2 bg-main rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                    <div className='h-2 w-2 bg-main rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                    <div className='h-2 w-2 bg-main rounded-full animate-bounce'></div>
                                </div>
                            )
                            : 'ارسال کد تایید'}

                    </button>

                    : <button disabled={loading} onClick={login} type="button" className="disabled:hover:bg-gray-400 disabled:bg-gray-400 h-10 bg-green-700 hover:bg-green-800 transition-colors duration-200 w-full text-bgcolor py-2 rounded-md px-4">
                        {loading
                            ?
                            (<div className='flex gap-2 justify-center items-center'>
                                <div className='h-2 w-2 bg-main rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-2 w-2 bg-main rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-2 w-2 bg-main rounded-full animate-bounce'></div>
                            </div>
                            )
                            : 'ورود'}
                    </button>
                }

            </form>

        </div>
    )
}