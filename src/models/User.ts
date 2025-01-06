import mongoose, {Model} from "mongoose"

// types and interfaces

export interface UserInterface {
  _id: mongoose.Types.ObjectId
  name: string
  lastName: string
  phone: string
  role: "ADMIN" | "USER" | "OWNER"
  email: string
}

export interface UserDocument extends Document, UserInterface {}

export interface UserModelInterface extends Model<UserDocument> {}

// schemas

const user = new mongoose.Schema<UserDocument>({
  name: {
    required: false,
    type: String,
    default: "",
  },
  lastName: {
    required: false,
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    length: 11,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "OWNER"],
    default: "USER",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
})

// the model

const UserModel: UserModelInterface =
  mongoose.models.User || mongoose.model<UserDocument>("User", user)

export default UserModel
