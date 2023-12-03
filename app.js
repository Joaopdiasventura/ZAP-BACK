import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import send from "./routes/send.js";
import view from "./routes/view.js";
import logar from "./config/Auth.js";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

// Configurar a sessão
app.use(session({
    secret: 'Jpplay2_0',
    resave: true,
    saveUninitialized: true
}));

// Habilitar o CORS para todas as origens
app.use(cors());

// Utilizar bodyParser para analisar corpos de solicitação JSON
app.use(bodyParser.json());

// Adicionar rotas
app.use(send);
app.use(view);

// Configurar autenticação com Passport
logar(passport);

// Conectar ao MongoDB
const mongoDBURI = "mongodb+srv://joaopdiasventura:Jpplay2_0@cluster0.7i4iw97.mongodb.net/zapzap";

mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Conexão com o MongoDB Atlas estabelecida com sucesso.");

    // Iniciar o servidor
    app.listen(port, () => {
        console.log(`SERVIDOR RODANDO NA PORTA ${port}`);
    });
})
.catch((error) => {
    console.error("Erro na conexão com o MongoDB:", error);
});
