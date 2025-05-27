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
    JUDGE0_API: process.env.JUDGE_API_URL || "http://localhost:2358",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "your-cloud-name",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "your-api-key",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "your-api-secret",
    CLOUDINARY_URL: process.env.CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload",
    SECRECT: process.env.SECRECT ||  "your-secret-key",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "your-google-client-id",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
    CALLBACK_URL: process.env.CALLBACK_URL || "http://localhost:5000/api/v1/users/auth/google/callback",
    CLIENT_REDIRECT_URL: process.env.CLIENT_REDIRECT_URL || "http://localhost:5173",
    GITHUB_CLIENT_ID: process.env.GIT_CLIENT_ID || "your-github-client-id",
    GITHUB_CLIENT_SECRET: process.env.GIT_CLIENT_SECRET || "your-github-client-secret",
    GITHUB_CALLBACK_URL: process.env.GIT_CALLBACK_URL || "http://localhost:5000/api/v1/users/auth/github/callback",
}

export const myEnvironment = Object.freeze(_environment)
