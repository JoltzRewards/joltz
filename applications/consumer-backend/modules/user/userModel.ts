import { model, Schema } from 'mongoose'

export interface IUser {
  name: string
  did: string
}

const userSchema: Schema<IUser> = new Schema(
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

export const User = model<IUser>('User', userSchema)
