import mongoose from "mongoose";
import { Schema } from "mongoose";

const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}); 

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;