import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config()


/*
Função para criptografa um usuário
Recebe como parametro apenas o json de um usuário
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


/*
Função para criptografa uma string
O primeiro parâmetro é a informação a ser descriptografada
O segundo parâmetro é o iv utilizado para criptografar aquele campo
*/ 
function criptografarCampo(info, iv) {
   
    const chave = crypto.scryptSync(process.env.CIPHER_KEY, 'salt', 24)
    const cifra = crypto.createCipheriv(process.env.ALGORITHM, chave, iv);
    let criptografado = cifra.update(info, 'utf-8', 'hex');
    criptografado += cifra.final('hex');
    return criptografado
}


/*
Função para descriptografa uma string
O primeiro parâmetro é a informação a ser descriptografada
O segundo parâmetro é o iv utilizado para criptografar aquele campo
*/ 
function descriptografar(info, iv) {
    const chave = crypto.scryptSync(process.env.CIPHER_KEY, 'salt', 24)
    const algorithm = process.env.ALGORITHM
    const descripto = crypto.createDecipheriv(algorithm, chave, Buffer.from(iv, 'hex'));

    let dec = descripto.update(info, 'hex', 'utf-8');
    dec += descripto.final('utf-8');

    return dec;
}

/* 
Função para comparar senhas
O primeiro parâmetro é a senha criptografada
O segundo parâmetro é a senha enviada pela requisição
O terceito parâmetro é o iv utilizado para criptografa os dados do usuario
*/
function checkPassword(password, passwordTest, iv){
    return (descriptografar(password, iv) == passwordTest)
}
export {criptografarCampo, descriptografar, criptografarUser, checkPassword};