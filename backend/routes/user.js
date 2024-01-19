import express from 'express';
import { User } from '../DB/models/Usuario.mjs';
const router = express.Router();

//criar conta
router.post('/create', async (req, res, next) => {
  //é melhor capturar o erro e tratar no catch
  try {
      const user = await User.findOne({
        where: {
          nick: req.body.nick,
      }
      })
    if (user){
      res.status(401).json({error: 'Este nick já esta sendo usado'})
    }else{
        const novoUser = await User.create(req.body);
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
        //pedindo senha para confirmar autorização
        if (user.password == req.body.password){
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
    if (user.password == body.password){
      User.update(
        {password: body.newPassword },
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
        }else{
            User.update(
                {nick: body.newNick},
                {where: {id:body.id}}
            )
            res.status(200).json('Nick alterado com sucesso')
        }
    }catch (err){
        console.log('Erro ao alterar nick: ', err)
        res.status(500).json({error: 'Não foi possivel alterar o nick'})
    }  
})

//login

export default router;
