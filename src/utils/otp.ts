import { randomInt } from "node:crypto"
export const generateOtp = (length: number = 6): string => {
    const min = Math.pow(10, length - 1)
    const max = Math.pow(10, length) - 1
    const otp = randomInt(min, max + 1)
    return otp.toString()
}
