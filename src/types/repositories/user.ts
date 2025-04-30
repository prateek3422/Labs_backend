export type TUser  = {
id:string,
name: string
image:string
email:string
role : string
password : string
createdAt: Date
updatedAt: Date
} 

export type IcreateUser = {
    name: string,
    email:string,
    password : string
}

export type IUpateUser = {
    email: string
    token?: string
    otp?: string
    isVerified?:boolean
}

export interface IUserRepo {
    getUsers(): Promise<[] | TUser[]>
    createUser(data: IcreateUser): Promise<null | TUser>
    updateUser(data: IUpateUser ): Promise<null | IUpateUser>
    
}
