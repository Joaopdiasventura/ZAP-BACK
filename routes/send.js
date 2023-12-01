import { Router } from "express";
import Usuario from "../models/usuario.js";
import Conversa from "../models/conversa.js";
import Mensagem from "../models/mensagem.js";
import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";
import passport from "passport";
import nodemailer from "nodemailer"

const send = Router();

send.post("/adicionar/usuario", async (req, res) => {
  try {
    const { nome, email, senha, senha2 } = req.body;

    if (senha == senha2) {
      let novoUsuario = new Usuario({
        email: email,
        nome: nome,
        senha: senha,
      });
      const salt = 10;
      const hash = await bcrypt.hash(novoUsuario.senha, salt);

      novoUsuario.senha = hash;

      await novoUsuario.save();
      console.log("Usuário registrado");
      return res.send({ok: "/login"});
    }
  } catch (error) {
    return res.send(error);
  }
});

send.post("/adicionar/conversa/:_id1/:_id2", async (req, res) => {
  try {
    const chatData = new Conversa({
      pessoa1: req.params._id1,
      pessoa2: req.params._id2,
    });

    await chatData.save();

    return res.send(chatData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

send.post("/adicionar/mensagem/:_idc/:_idr/:_idd", async (req, res) => {
  try {
    const textData = new Mensagem({
      conversa: req.params._idc,
      destinatario: req.params._idr,
      remetente: req.params._idd,
      conteudo: req.body.conteudo,
    });

    await textData.save();

    return res.send(textData);
  } catch (error) {}
    
});

send.post("/email/:email", async(req, res)=>{
    const usuario = await Usuario.findOne({email: req.params.email});
    if (usuario) {
        res.send(usuario);
    }
    else{
        res.send({message: "Conta não encontrada"});
    }
})

send.post("/enviar/:email", async (req, res) => {
    const erros = [];

    let cod;

    const usuarioExistente = await Usuario.findOne({ email: req.params.email });
    if (usuarioExistente) {
        erros.push({ texto: "EMAIL REGISTRADO NO SISTEMA... TENTE OUTRO" });
        res.render("registro", { erros: erros })
    } else {
        cod = (Math.random() * 999).toFixed(0);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jpplayrucoy@gmail.com',
                pass: 'fwkg dkgg bigp ufqw',
            },
        });

        const mailOptions = {
            from: 'jpplayrucoy@gmail.com',
            to: req.params.email,
            subject: 'CÓDIGO DE REGISTRO PARA O ZAP DO VULGO JP',
            text: cod,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar o e-mail: ' + error);
            } else {
                res.send({ cod: cod });
            }
        });
    }
});

send.post("/login", async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (!user) {
        console.error(info);
        return res.send(info );
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          return res.send( err );
        }
        return res.send(user);
      });
    })(req, res, next);
  });

export default send;
