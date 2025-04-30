/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { myEnvironment } from "@/configs"
import Mailgen from "mailgen"
import { Resend } from "resend"

const resend = new Resend("re_123456789")

const sendEmail = async ({ email, subjects, mailgentemp }: { email: string; subjects: string; mailgentemp: Mailgen.Content }) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Algolab",
            link: "https://mailgen.js/"
        }
    })

    const emailBody = mailGenerator.generate(mailgentemp)

    const emailText = mailGenerator.generatePlaintext(mailgentemp)

    const { data, error } = await resend.emails.send({
        from: myEnvironment.EMAIL || "info@prateekdev.me",
        to: email,
        subject: subjects,
        text: emailText,
        html: emailBody
    })

    if (error) {
        return {
            statuscode: 200,
            message: error
        }
    }
    return {
        statusCode: 200,
        message: "email send success",
        data
    }
}



const emailverify =  ({ name, otp }: { name: string; otp: string }) => {
    return {
        body: {
            name: name,
            intro: "Welcome to our app! We're very excited to have you on board.",
            dictionary: {
                OTP: otp
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}

export { sendEmail, emailverify }
