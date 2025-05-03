export type TUser = {
    id: string
    name: string
    image: string
    email: string
    role: string
    refreshToken: string
    otp: string
    isVerified?: boolean
    password: string
    createdAt: Date
    updatedAt: Date
}

export type IcreateUser = {
    name: string
    email: string
    password: string
    refreshToken: string
    otp: string
    isVerified?: boolean
}

export type IUpateUser = {
    email: string
    token?: string
    isVerified?: boolean
}

export interface IUserRepo {
    getUsers(): Promise<null | TUser[]>
    createUser(data: IcreateUser): Promise<null | TUser>
    updateUser(data: IUpateUser): Promise<null | IUpateUser>
}
