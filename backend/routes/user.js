import express from 'express';
import { User } from '../DB/models/Models.mjs';
import {criptografarUser, criptografarCampo , checkPassword} from '../cifras.js'
import { userLogger } from '../logsModels.js';


const router = express.Router();

//Criar conta
router.post('/create', userLogger, async (req, res) => {
    const nick = req.body.nick
    try {
      const user = await User.findOne({
        where: {
          nick: nick
      }
      })
    if (user){
      res.status(401).json({error: 'Este nick já esta sendo usado'})
    }else{
        //ultimo erro aqui
        const userCryptografado = criptografarUser(req.body)
        const novoUser = await User.create(userCryptografado);
        res.status(201).json(novoUser);
      } 
  }catch (err){
    console.error('Erro ao criar novo usuário: ', err)
    res.status(500).json({error: 'Erro no servidor'})
  }
});

//Deletar conta
router.delete('/delete', userLogger, async (req, res, next) => {
  
    try {
        const user = await User.findOne({
            where: {
            id: req.body.id,
         }
        })
        if (!user){
            res.status(406).json({error: 'Conta não encontrada'})
        }
        //pedindo senha para confirmar autorização
        else if (checkPassword(user.password, req.body.password, user.iv)){
            User.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.status(202).json('Conta excluida')
        }else{
            res.status(401).json({error: 'Exclusão não autorizada'})
        }}catch(err) {
            console.error('Erro ao apagar a conta: ', err)
            res.status(500).json({error: 'Erro no servidor'})
        }
    }
 
);

//Mudar a senha
router.patch('/changepassword', userLogger, async (req, res, next) => {
  const password = req.body.password
  const newPassword = req.body.newPassword
  const user = await User.findOne({
    where: {
      id: req.body.id,
    }
  })
  try {
    if (!user){
        res.status(406).json({error: 'Conta não encontrada'})
    }
    //Checando a senha, essa função não foi feita para ajudar na recuperação da senha, apenas na troca.
    else if (checkPassword(user.password, password, user.iv)){
      User.update(
        {password: criptografarCampo(newPassword, user.iv) },
        {where: {id: user.id}}
      )
      res.status(200).json('Senha alterada com sucesso')
    }else {
      res.status(401).json({error: 'Senha incorreta'})
    }
  }catch (err){
    console.log("Erro ao alterar a senha: ", err)
    res.status(500).json({error: 'Falha ao alterar senha'})
  }
});

//Mudar nick
router.patch('/changenick', userLogger, async (req, res) => {
    const newNick = req.body.newNick;
    const id = req.body.id
    const password =  req.body.password
    try {
        //Garantir que mais ninguem usa o mesmo nick
        const user = await User.findOne({
            where: {
                nick: newNick
            }
        })
        // Se houver o nick não estiver sendo usado entao tenta alterar
        if (user){
            //Caso o nick já esteja sendo usado
            res.status(401).json('Este nick não esta disponível')
        }else {
            const user2 = await User.findOne({
                where: {
                    id: id
                }
            })
            //Se a senha enviada estiver correta então a alteração é feita
            if(checkPassword(user2.password, password, user2.iv)){
                User.update(
                    {nick: newNick},
                    {where: {id: id}}
                )
                res.status(200).json('Nick alterado com sucesso') 
            } //caso a senha não esteja correta
            else {
                res.status(401).json('Senha incorreta')
            }
        }        
    }catch (err){
        console.log('Erro ao alterar nick: ', err)
        res.status(500).json({error: 'Não foi possivel alterar o nick'})
    }  
})

//Fazer login
router.post("/login", userLogger ,async (req, res) => {
    const nick = req.body.nick
    try {
        const user = await User.findOne({
            where: {
                nick: nick
            }
        })
        if (!user){
            res.status(400).json('Este nick não existe')
        }else if(checkPassword(user.password, req.body.password, user.iv)) {
            req.session.user = { username: user.nick };
            res.status(200).json({ message: 'Login bem-sucedido'});
            //res.redirect('/index.html') NOVA PÁGINA APÓS O LOGIN
        }else{
            res.status(401).json('Senha incorreta')
        }
    }catch (err) {
        console.log('Erro ao alterar nick: ', err)
        res.status(500).json({error: 'Não foi possivel iniciar a seção, tente novamente mais tarde'})
    }   
})

//Fazer logout
router.post("/logout", userLogger, async (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout bem-sucedido' });
    
})

export default router;

