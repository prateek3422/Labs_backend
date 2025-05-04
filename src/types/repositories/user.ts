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
    refreshToken?: string
    otp?: string

}

export type IVerifyUser = {
    email?: string
    otp?: string
    isVerified?: boolean
    refreshToken?: string
}

export type IUpateUser = {
    email: string
    token?: string
    isVerified?: boolean
}

export type ISingleUser = {
    email : string
}

export interface IUserRepo {
    getUser(): Promise<null | TUser>
    getSingleUser(data:ISingleUser): Promise<null | TUser>
    getUsers(): Promise<[] | TUser[]>
    createUser(data: IcreateUser): Promise<null | TUser>
    verifyUser(data: IcreateUser): Promise<null | IVerifyUser>
    updateUser(data: IUpateUser): Promise<null | IUpateUser>
}
