import bcrypt from "bcryptjs"

class Hash {
    // create hash
    createHash = (data: string) => {
        const salt = bcrypt.genSaltSync(12)
        return bcrypt.hashSync(data, salt)
    }
    // compare hash
    compareHash = (data: string, hash: string) => {
        return bcrypt.compareSync(data, hash)
    }
}

export const hashUtilities = new Hash()
