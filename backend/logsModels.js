import { token } from "morgan";
import fs from 'fs';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

function logout(tokens, req, res) {
    const timestamp = new Date().toISOString(); 
    //const username = req.body.name || 'N/A'; // Obtém o nome de usuário da solicitação ou usa 'N/A' se não estiver presente
    const session = req.session
    return [
      timestamp,
      //`User: ${username}`,
      //session,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ');
  }


  function Posts(tokens, req, res) {
     const timestamp = new Date().toISOString(); 
     const userName  = req.body.userNick;
     return [
       timestamp, 
       `User: ${userName}`,
       tokens.method(req, res),
       tokens.url(req, res),
       tokens.status(req, res),
       tokens['response-time'](req, res), 'ms'
    ].join(' ');
  }
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  export{logout, Posts, accessLogStream};