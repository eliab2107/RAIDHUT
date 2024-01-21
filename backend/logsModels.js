import { token } from "morgan";
import fs from 'fs';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";


//Os dois acabaram ficando iguais, mas é melhor deixar separado por possiveis mudanças futuras
function logInOut(tokens, req, res) {
    const timestamp = new Date().toISOString(); 
    const nick = req.body.nick || 'N/A';
    
    return [
      timestamp,
      `User: ${nick}`,
      tokens.method(req, res),
      tokens.url(req, res),
      `status  ${tokens.status(req, res)}`,
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ');
  }


  function Posts(tokens, req, res) {
     const timestamp = new Date().toISOString(); 
     const nick  = req.body.nick;
     return [
       timestamp, 
       `User: ${nick}`,
       tokens.method(req, res),
       tokens.url(req, res),
       `status  ${tokens.status(req, res)}`,
       tokens['response-time'](req, res), 'ms'
    ].join(' ');
  }


const __dirname = dirname(fileURLToPath(import.meta.url));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//Constante para gerar logs de post na pasta 'acess.log'
const postLogger = morgan(Posts, { stream: accessLogStream } );
//Constante para gerar logs de usuários na pasta 'acess.log'
const userLogger = morgan(logInOut, { stream: accessLogStream });
export{logInOut, Posts, accessLogStream, postLogger, userLogger};