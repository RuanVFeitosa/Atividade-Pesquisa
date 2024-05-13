const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const secretKey = 'seuSegredo'; // A chave secreta usada para assinar o token

// Middleware para processar corpos de solicitação JSON
app.use(bodyParser.json());

// Simulação de banco de dados de usuários
const users = [
    { id: 1, username: 'usuario', password: 'senha' }
];

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar as credenciais do usuário
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    // Retornar o token como parte da resposta
    res.json({ token: token });
});

// Middleware para validar o token em solicitações subsequentes
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.user = decoded; // Decodifica e armazena o payload do token no objeto de solicitação
        next();
    });
}

// Rota protegida que requer autenticação
app.get('/recurso-protegido', verifyToken, (req, res) => {
    res.json({ message: 'Este é um recurso protegido' });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

//-----------------------------------------------Função mensagem Botão----------------------------------------------------//
function togglePopup() {
    var popup = document.getElementById("popup");
    if (popup.style.display === "block") {
      popup.style.display = "none";
    } else {
      popup.style.display = "block";
    }
  }
  //-----------------------------------------------Função mensagem Botão----------------------------------------------------//