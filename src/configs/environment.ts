import dotenvFlow from "dotenv-flow"
dotenvFlow.config()

const _environment = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 5000,
    RESEND: process.env.RESEND_API_KEY,
    EMAIL: process.env.PRODUCT_EMAIL || "ps0431299@gmail.com",
    TOKEN: process.env.TOKEN || "JDkskjkjashsashda",
    TOKEN_EXPAIRY: process.env.TOKEN_EXPAIRY || "10m",
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || "askljkjsakldjjmkjqojiosaks",
    REFRESH_TOKEN_EXPAIRY: process.env.REFRESH_TOKEN_EXPAIRY || "10D",
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || "kasajkahsahsjahjsab",
    ACCESS_TOKEN_EXPAIRY: process.env.ACCESS_TOKEN_EXPAIRY || "60m",
    JUDGE0_API: process.env.JUDGE_API_URL || "http://localhost:2358"
}

export const myEnvironment = Object.freeze(_environment)
