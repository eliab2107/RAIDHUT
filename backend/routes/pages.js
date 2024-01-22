import express from 'express';
import {Post, User} from '../DB/models/Models.mjs';
import { Posts, accessLogStream, postLogger, addInSession} from '../logsModels.js';
import { checkPassword } from '../cifras.js';

const router = express.Router();

//Inicio para decidir sse vai cadastrar ou logar
router.get("/", (req, res) => {
    res.render("../views/index.ejs")
})

//tela para cadastro
router.get("/register", (req, res) => {
    res.render("../views/register.ejs")
})

//tela para login
router.get("/login", (req, res) => {
    res.render("../views/login.ejs")
})

//tela depois de logado
router.get("/welcome", (req, res) => {
    res.render("../views/welcome.ejs")
})



export default router;