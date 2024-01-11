import mongoose, { Model } from "mongoose";
interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  admin: boolean;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// export default (mongoose.model.users as Model<IUser>) ||
//   mongoose.model<IUser>("users", userSchema);

export default (mongoose.models.users ||
  mongoose.model<IUser>("users", userSchema)) as Model<IUser>;
