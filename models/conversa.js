import mongoose from "mongoose";
import { Schema } from "mongoose";

const conversaSchema = new Schema({
    pessoa1: {
        type: String,
        required: true
    },
    pessoa2: {
        type: String,
        required: true
    }
}); 

const Conversa = mongoose.model("conversa", conversaSchema);

export default Conversa;