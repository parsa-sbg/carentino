import jwt, { JwtPayload } from 'jsonwebtoken'

type payloadType = {
    phone: string
}
const secretKey = process.env.PRIVATEKEY
if (!secretKey) throw new Error('privete key is not defined')

export const generateToken = ({ phone }: payloadType) => {
    try {

        const token = jwt.sign({ phone }, secretKey, {
            expiresIn: '168h'
        })
        return token

    } catch (err) {
        console.error('token generation error. error => ', err)
    }
}

export const verifyToken = (token: string): JwtPayload | false => {

    try {
        const payload = jwt.verify(token, secretKey)
        if (typeof payload == 'object') {
            return payload
        }
        return false
    } catch {
        return false
    }
}