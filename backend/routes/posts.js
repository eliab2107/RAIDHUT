import express from 'express';
import {Post, User} from '../DB/models/Models.mjs';
import { Posts, accessLogStream, postLogger, addInSession} from '../logsModels.js';
import { checkPassword } from '../cifras.js';

const router = express.Router();


//CRIAR POST
router.post('/create', postLogger, async (req, res) => {
  const userId = req.body.UserId;
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    if (user && user.nick == req.body.nick){
      const post = await Post.create(req.body);
      req.session.historico = addInSession("createpost", "PATCH", 201, req.session)
      res.status(201).json(post)
    }else{

      req.session.historico = addInSession("createpost", "PATCH", 401, req.session)
      res.status(401).json({error: "Postagem não realizada"})
    } 
  }catch (err) {
    console.log("Erro ao criar novo post: ", err)
    req.session.historico = addInSession("createpost", "PATCH", 500, req.session)
    res.status(500).json({error: 'Não foi possivel realizar o post, tente novamente mais tarde'})
  }
});

//APAGAR DELETE
router.delete("/delete", postLogger, async (req, res) => {
  const userId = req.body.UserId
  const id = req.body.id
  try {
    const post = await Post.findOne({
      where: {
        id: id
      }
    })
    if (post.UserId == userId){
      post.destroy()
      req.session.historico = addInSession("deletepost", "PATCH", 200, req.session)
      res.status(200).json('Post apagado com sucesso')
    }else{
      req.session.historico = addInSession("deletepost", "PATCH", 401, req.session)
      res.status(401).json({error: 'Você não tem autorização para isso'})
    }
  }catch (err){
    console.log("Erro ao criar novo post: ", err)
    req.session.historico = addInSession("deletepost", "PATCH", 500, req.session)
    res.status(500).json({error: 'Não foi possivel apagar o post, tente novamente mais tarde'})
  }
})

//PEGAR TODOS OS POSTS DE UM USUÁRIO
router.get("/getall", postLogger, async (req, res) => {
  const userId =  req.body.UserId
  const password = req.body.password
  try {    
      const user = await User.findOne({
        where: {
          id: userId
        }
      })
      if (user){
        //Exigir autenticação caso estejam enviando requisições maliciosas
        if (!checkPassword(user.password, password, user.iv )){
          req.session.historico = addInSession("getallpost", "PATCH", 401, req.session)
          res.status(401).json({mesage:"Não foi possível carregar a tela"})
        }else{
          const posts =  await Post.findAll({
            where: {
              UserId: userId
            }
          })
          req.session.historico = addInSession("getallpost", "PATCH", 200, req.session)
          res.status(200).json(posts)
        }
      }else{
        req.session.historico = addInSession("getallpost", "PATCH", 401, req.session)
        req.session.historico.push(addInSession("getallposts", "POST", 401))
        res.status(401).json({message: "A conta não foi encontrada"})
      }
      
  }catch (err) {
    console.log("Erro ao criar novo post: ", err)
    req.session.historico = addInSession("getallpost", "PATCH", 500, req.session)
    res.status(500).json({error: 'Não foi possivel carregar suas postagens, tente novamente mais tarde'})
  }
  
})
export default router;
