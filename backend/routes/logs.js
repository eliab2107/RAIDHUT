import express from 'express';
import {Post, User} from '../DB/models/Models.mjs';
import { checkPassword } from '../cifras.js';

const router = express.Router();
//FALTA TESTAR
router.get("/", async (req, res) => {
    const id = req.body.id;
    const nick = req.body.nick;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            where: {
            id: id,
            nick: nick,
         }
        })
        if (user){
            if (checkPassword(user.password, password, user.iv)){
                const historico = req.session.historico
                res.status(200).json({historico: historico})
            }else{
                
                res.status(401).json({error: "Senha incorreta"})
            }
        }else{
            res.status(400).json({error: "Usuário não encontrado"})
        }
    }catch(err){
        console.error('Erro ao criar novo usuário: ', err)
        res.status(500).json({error: 'Erro no servidor'})
    }
}) 

export default router;