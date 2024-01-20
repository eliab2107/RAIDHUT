import express from 'express';
import { User } from '../DB/models/Usuario.mjs';
import {criptografarUser, criptografarCampo ,descriptografar} from '../cifras.js'
import { logout } from '../logsModels.js';
import morgan from 'morgan';

const router = express.Router();
//Retorna um booleano. Caso as senhas sejam iguais True.
function checkPassword(password, passwordTest, iv){
    return (descriptografar(password, iv) == passwordTest)
}

//criar conta
router.post('/create', async (req, res) => {
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
router.delete('/delete', async (req, res, next) => {
  
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

//mudar a senha
router.patch('/changepassword', async (req, res, next) => {
  const body = req.body
  const user = await User.findOne({
    where: {
      id: req.body.id,
    }
  })
  try {
    if (!user){
        res.status(406).json({error: 'Conta não encontrada'})
    }
    //Checando a senha
    
    if (checkPassword(user.password, req.body.password, user.iv)){
      User.update(
        {password: criptografarCampo(body.newPassword, user.iv) },
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

//mudar nick
router.patch('/changenick', async (req, res) => {
    const body =req.body
    
    try {
        //Garantir que mais ninguem usa o mesmo nick
        const user = await User.findOne({
            where: {
                nick: body.newNick
            }
        })
        if (user){
            res.status(401).json('Este nick não esta disponível')
        }else if (checkPassword(user.password, req.body.password, user.iv)){
            User.update(
                {nick: body.newNick},
                {where: {id:body.id}}
            )
            res.status(200).json('Nick alterado com sucesso')
        }else {
            res.status(401).json('Senha incorreta')
        }
    }catch (err){
        console.log('Erro ao alterar nick: ', err)
        res.status(500).json({error: 'Não foi possivel alterar o nick'})
    }  
})

//login
router.post("/login", async (req, res) => {
    const nick = req.body.nick
    const password = req.body.password
    try {
        const user = await User.findOne({
            where: {
                nick: nick
            }
        })
        if (!user){
            res.status(400).json('Este nick não existe')
        }else if(checkPassword(user.password, req.body.password, user.iv)) {
            req.session.user = { id: user.id, username: user.nick };
            res.status(200).json({ message: 'Login bem-sucedido', user: req.session.user });
            //res.redirect('/index.html') NOVA PÁGINA APÓS O LOGIN
        }else{
            res.status(401).json('Senha incorreta')
        }
    }catch (err) {
        console.log('Erro ao alterar nick: ', err)
        res.status(500).json({error: 'Não foi possivel iniciar a seção, tente novamente mais tarde'})
    }   
})
const logoutLogger = morgan(logout);
router.post("/logout", logoutLogger, async (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout bem-sucedido' });
    
})

export default router;

