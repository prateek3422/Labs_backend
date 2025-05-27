export type TUser = {
    id: string
    name: string
    image: Record<string, string>
    email: string
    role: string
    refreshToken: string
    otp: string
    isVerified?: boolean
    LoginType?: string
    password: string
}

export type IcreateUser = {
    name: string
    email: string
    password: string
    refreshToken?: string
    otp?: string
    isVerified?: boolean
    LoginType?: string
    image?: Record<string, string> | string
}

export type IVerifyUser = {
    email?: string
    otp?: string
    isVerified?: boolean
    refreshToken?: string
}

export type IUpateUserPassword = {
    email: string
    password: string
    otp: string
    refreshToken?: string
}

export type ISingleUser = {
    email?: string
    id?: string
    refreshToken?: string
}

export interface IUserRepo {
    getUser(): Promise<null | TUser>
    getSingleUser(data: ISingleUser): Promise<null | TUser>
    getUsers(): Promise<[] | TUser[]>
    createUser(data: IcreateUser): Promise<null | TUser>
    verifyUser(data: IcreateUser): Promise<null | IVerifyUser>
    updateUserPassword(data: IUpateUserPassword): Promise<null | TUser>
    updateUser(data: TUser): Promise<null | TUser>
}
