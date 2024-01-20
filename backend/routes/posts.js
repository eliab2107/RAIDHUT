import express from 'express';
import {Post} from '../DB/models/Postagem.mjs';
import {User} from '../DB/models/Usuario.mjs';
import { Posts, accessLogStream } from '../logsModels.js';
import morgan from 'morgan';
const router = express.Router();

//CRIAR POST
const createpost = morgan(Posts, { stream: accessLogStream } );
router.post('/create', createpost, async (req, res, next) => {
  const userId = req.body.userId
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    if (user && user.nick == req.body.userNick){
      const post = await Post.create(req.body);
      res.status(201).json(post)
    }else{
      res.status(401).json({error: "Postagem não realizada"})
    } 
  }catch (err) {
    console.log("Erro ao criar novo post: ", err)
    res.status(500).json({error: 'Não foi possivel realizar o post, tente novamente mais tarde'})
  }
});

//APAGAR DELETE
router.delete("/delete", createpost, async (req, res) => {
  const body = req.body
  try {
    const post = await Post.findOne({
      where: {
        id: body.id
      }
    })
    if (post.userId == body.userId){
      post.destroy()
      res.status(200).json('Post apagado com sucesso')
    }else{
      res.status(401).json({error: 'Você não tem autorização para isso'})
    }
  }catch (err){
    console.log("Erro ao criar novo post: ", err)
    res.status(500).json({error: 'Não foi possivel apagar o post, tente novamente mais tarde'})
  }
})

//PEGAR TODOS OS POSTS DE UM USUÁRIO
router.get("/getall", createpost, async (req, res) => {
  try {
      
      const posts =  await Post.findAll({
      where: {
        userId: req.body.userId
      }
    })
    res.status(200).json(posts)
  }catch (err) {
    console.log("Erro ao criar novo post: ", err)
    res.status(500).json({error: 'Não foi possivel carregar suas postagens, tente novamente mais tarde'})
  }
  
})
export default router;
