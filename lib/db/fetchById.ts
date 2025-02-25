import mongoose from 'mongoose'

export const fetchById = async (
                                model: mongoose.Model<any>, 
                                id: string,
                                populatedFields: string[] = []) => {
    if(!mongoose.Types.ObjectId.isValid(id)) return null

    return model.findById(id).populate(populatedFields)
}