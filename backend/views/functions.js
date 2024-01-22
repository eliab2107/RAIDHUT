// Adicione esta função no seu app.js
function cadastrar() {
    const email = document.getElementById('email').value;
    const nick = document.getElementById('nick').value;
    const password = document.getElementById('password').value;

    // Fazer requisição para o backend para cadastrar o usuário
    fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email":email, "nick": nick, "password":password }),
    })
    .then(response => {
        if (response.ok) {
            // Cadastro bem-sucedido, redirecione para a página de login ou faça algo mais
            window.location.href = '/login';
        } else {
            // Trate o erro de cadastro, por exemplo, exibindo uma mensagem de erro
            console.error('Erro no cadastro:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro inesperado:', error.message);
    });
}
