import { Router } from "express";
import Usuario from "../models/usuario.js";
import Conversa from "../models/conversa.js";
import Mensagem from "../models/mensagem.js";
import cors from "cors";

const view = Router();

view.get("/conversas/:_id", async (req, res) => {
    try {
        const Conversas1 = await Conversa.find({ pessoa1: req.params._id });
        const Conversas2 = await Conversa.find({ pessoa2: req.params._id });

        const TodasConversas = Conversas1.concat(Conversas2);

        res.send(TodasConversas);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao obter conversas.' });
    }
});

view.get("/pessoa1/:_id", async (req, res) => {
    try {
        const pessoa1 = await Usuario.find({ _id: req.params._id });
        res.send(pessoa1);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao obter pessoa1.' });
    }
});


view.get("/pessoa2/:_id", async (req, res) => {
    try {
        const pessoa2 = await Usuario.find({ _id: req.params._id });
        res.send(pessoa2);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao obter pessoa2.' });
    }
});


view.get("/mensagens/:_id", async(req, res) => {
    try {
        
        const Mensagens = await Mensagem.find({conversa: req.params._id})

        return res.send(Mensagens);

    } catch (error) {
        
    }
});

view.options("/mensagens/:_id", cors());

export default view;