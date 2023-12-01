import mongoose from "mongoose";
import { Schema } from "mongoose";

const mensagemSchema = new Schema({
    conversa: {
        type: Schema.ObjectId,
        required: true
    },
    destinatario: {
        type: Schema.ObjectId,
        required: true
    },
    remetente: {
        type: Schema.ObjectId,
        required: true
    },
    conteudo:{
        type: String,
        required: true
    }
}); 

const Mensagem = mongoose.model("mensagen", mensagemSchema);

export default Mensagem;