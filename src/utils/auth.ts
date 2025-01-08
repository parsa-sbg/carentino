"use server"
import UserModel from "@/models/User"
import {connectToDataBase} from "./DB"
import {verifyToken} from "./token"

export const authUserWhitToken = async (token: string | undefined) => {
    if (!token) {
        return null
    }

    const payload = verifyToken(token)

    if (!payload) {
        return null
    }

    const phone = payload.phone as string

    if (!phone) {
        return null
    }

    try {
        await connectToDataBase()
        const user = await UserModel.findOne({phone})

        if (!user) {
            return null
        }

        return user
    } catch (err) {
        console.log("auth user error ==>>", err)
        return null
    }
}
