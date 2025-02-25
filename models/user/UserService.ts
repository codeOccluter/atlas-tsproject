import User, { IUser } from './User'

export const getUsers = async () => {
    return await User.find()
}

export const getUserById = async (id: string) => {
    return await User.findById(id)
}

export const createUser = async (data: Partial<IUser>) => {
    return await User.create(data)
}

export const updateUser = async (id: string, data: Partial<IUser>) => {
    return await User.findByIdAndUpdate(id, data, { new: true })
}

export const deleteUser = async (id: string) => {
    return await User.findByIdAndDelete(id)
}