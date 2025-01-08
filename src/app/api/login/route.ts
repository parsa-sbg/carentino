import {OtpModel} from "@/models/Otp"
import UserModel from "@/models/User"
import {connectToDataBase} from "@/utils/DB"
import {generateToken} from "@/utils/token"
import {otpSchema} from "@/validations/otpSchema"
import {phoneSchema} from "@/validations/phoneSchema"
import {cookies} from "next/headers"
import {NextRequest} from "next/server"
import {z} from "zod"

export const POST = async (req: NextRequest) => {
    const validator = z.object({
        otp: otpSchema,
        phone: phoneSchema,
    })

    const reqBody = await req.json()

    const parsedData = validator.safeParse(reqBody)

    if (!parsedData.success) {
        return Response.json(parsedData, {status: 400})
    }

    console.log(parsedData)

    try {
        connectToDataBase()

        const isPhoneAndOtpExist = await OtpModel.findOne({
            phone: parsedData.data.phone,
            otpCode: parsedData.data.otp,
        })

        if (!isPhoneAndOtpExist) {
            return Response.json({message: "otp or phone is not correct"}, {status: 401})
        }

        let user = await UserModel.findOne({phone: parsedData.data.phone})

        if (!user) {
            const newUser = await UserModel.create({
                phone: parsedData.data.phone,
            })

            user = newUser
        }

        const token = generateToken({phone: parsedData.data.phone})

        if (!token) {
            return Response.json({message: "field to generate token"}, {status: 500})
        }

        const cookiesStore = await cookies()

        cookiesStore.set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })

        // delete otp from db
        await OtpModel.findOneAndDelete({
            phone: parsedData.data.phone,
            otpCode: parsedData.data.otp,
        })

        return Response.json({user}, {status: 200})
    } catch (err) {
        console.log("login error ==>", err)
        return Response.json({message: "internal server error"})
    }
}
