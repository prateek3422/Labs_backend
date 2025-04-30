import jwt from "jsonwebtoken"

class Token {
    // sign token
    sign = (payload: object, secret: string, expire: string | number) => {
        return jwt.sign(payload, secret, { expiresIn: expire as jwt.SignOptions["expiresIn"] })
    }

    // verify token
    verify = (token: string, secret: string) => {
        return jwt.verify(token, secret)
    }
}
export const tokenUtilities = new Token()
