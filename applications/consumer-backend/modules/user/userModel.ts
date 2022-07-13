import { Document, Model, model, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
}

const userSchema: Schema = new Schema(
  {
    did: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const User = model<IUser>('User', userSchema)

export default User
