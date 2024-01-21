import { token } from "morgan";
import fs from 'fs';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import { HostNotFoundError } from "sequelize";


//Os dois acabaram ficando iguais, mas é melhor deixar separado por possiveis mudanças futuras
function Users(tokens, req, res) {
    const timestamp = new Date().toISOString(); 
    const nick = req.body.nick || "NA";
    const id =req.body.id  || "NA"; 
    const log = {
      "timestamp": timestamp,
      "User":nick,
      "Id": id,
      "metodo": tokens.method(req, res),
      "url": tokens.url(req, res),
      "status": tokens.status(req, res),
      "resposta":tokens.res(req, res, 'content-length'), 
      "tempoResposta": tokens['response-time'](req, res)
    }
    return JSON.stringify(log)
  }


  function Posts(tokens, req, res) {
     const timestamp = new Date().toISOString(); 
     const nick = req.body.nick || "NA";
     const id =req.body.id  || "NA"; 
     const log = {
       "timestamp": timestamp,
       "User":nick,
       "Id": id,
       "metodo": tokens.method(req, res),
       "url": tokens.url(req, res),
       "status": tokens.status(req, res),
       "tempoResposta": tokens['response-time'](req, res)
     }
     return JSON.stringify(log)
  }


function addInSession(action, metodo, status, session){
  const horario = new Date().toISOString();
  let historico = []
  historico = session.historico
  const id = session.id; 
  historico.push({
    "usuario": id,
    "horario": horario,
    "action":  action,
    "metodo":  metodo,
    "status":  status
  })
  return historico
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//Constante para gerar logs de post na pasta 'acess.log'
const postLogger = morgan(Posts, { stream: accessLogStream } );
//Constante para gerar logs de usuários na pasta 'acess.log'
const userLogger = morgan(Users, { stream: accessLogStream });
export{ Posts, accessLogStream, postLogger, userLogger, addInSession};