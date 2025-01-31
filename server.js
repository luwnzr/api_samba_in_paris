const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_db", // Banco de dados atualizado
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
        throw err;
    }
    console.log("Conectado ao banco de dados!");
});

// Rota para criar uma reserva
app.post("/reservas", (req, res) => {
    const { nome, email, telefone, data, horario, numero_pessoas, mensagem } = req.body;

    // Verifica se os campos obrigatórios estão presentes
    if (!nome || !email || !data || !horario || !numero_pessoas) {
        return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }

    const sql = `
        INSERT INTO reservas (nome, email, telefone, data, horario, numero_pessoas, mensagem)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [nome, email, telefone, data, horario, numero_pessoas, mensagem], (err, result) => {
        if (err) {
            console.error("Erro ao criar reserva:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Reserva criada com sucesso!" });
    });
});

// Rota para obter todas as reservas (apenas para o admin)
app.get("/reservas", (req, res) => {
    const sql = "SELECT * FROM reservas";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao obter reservas:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para login (apenas para o admin)
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Erro ao realizar login", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            const user = results[0];
            res.json({ message: "Login bem-sucedido!", user });
        } else {
            res.status(401).json({ message: "Credenciais inválidas!" });
        }
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});