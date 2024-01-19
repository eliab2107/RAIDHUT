import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config()
/*DADOS
{
            "nick": criptografar(req.body.nick),
            "password": criptografar(req.body.password),
            "email": criptografar(req.body.email)
        } 
*/
function criptografarUser(dados) {
   
    const iv = Buffer.alloc(16);
    const chave = crypto.scryptSync(process.env.CIPHER_KEY, 'salt', 24)    
    const cifra1 = crypto.createCipheriv(process.env.ALGORITHM, chave, iv);
    //cifrando o email
    let email = cifra1.update(dados.email, 'utf-8', 'hex');
    email += cifra1.final('hex');
    
    const cifra2 = crypto.createCipheriv(process.env.ALGORITHM, chave, iv);
    //cifrando a senha
    let password = cifra2.update(dados.password, 'utf-8', 'hex');
    password += cifra2.final('hex');
    return {"nick":     dados.nick,
            "password": password,
            "email":    email,
            "iv": iv};
}

function criptografarCampo(info, iv) {
   
    const chave = crypto.scryptSync(process.env.CIPHER_KEY, 'salt', 24)
    const cifra = crypto.createCipheriv(process.env.ALGORITHM, chave, iv);
    //cifrando o nick
    let criptografado = cifra.update(info, 'utf-8', 'hex');
    criptografado += cifra.final('hex');
    return criptografado
}



function descriptografar(info, iv) {
    const chave = crypto.scryptSync(process.env.CIPHER_KEY, 'salt', 24)
    const algorithm = process.env.ALGORITHM
    const descripto = crypto.createDecipheriv(algorithm, chave, Buffer.from(iv, 'hex'));

    let dec = descripto.update(info, 'hex', 'utf-8');
    dec += descripto.final('utf-8');

    return dec;
}
export {criptografarCampo, descriptografar, criptografarUser};