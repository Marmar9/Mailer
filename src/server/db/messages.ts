import mongoose, { Model } from "mongoose";
interface IMessage extends Document {
  title: string;
  sendersName: string;
  sendersEmail: string;
  receiversEmail: string;
  read: boolean;
  content: string;
  contentType: "html" | "plaintext";
  date: string;
}

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sendersName: {
    type: String,
    required: true,
  },
  sendersEmail: {
    type: String,
    required: true,
    unique: true,
  },
  receiversEmail: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default (mongoose.models.messages ||
  mongoose.model<IMessage>("messages", messageSchema)) as Model<IMessage>;
