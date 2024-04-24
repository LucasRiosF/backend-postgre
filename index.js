const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lucas',
    password: 'ds564',
    port: 5432,
});


function idade(datadenascimento) {
    const diaAtual = new Date();
    const idade = diaAtual.getFullYear() - datadenascimento.getFullYear();
    const mesAtual = diaAtual.getMonth();
    const mesNascimento = datadenascimento.getMonth();
    if(mesNascimento > mesAtual) {
        
    }
}

app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os usuarios', error);
        res.status(500).send({mensagem: 'Erro ao obter todos os usuarios'})
    }
});

app.post('/usuarios', async(req, res) => {
    try {
        const {nome, email} = req.body;
        await pool.query('INSERT INTO usuarios (nome, sobrenome, datadenascimento, email, idade, signo, sexo]) VALUES ($1, $2, $3, $4, $5, $6, %7)', [nome, sobrenome, datadenascimento, email, idade, signo, sexo]);
        res.status(201).send({mensagem: 'Sucesso ao criar usuario'});
    } catch (error) {
        console.error('Erro ao criar todos os usuarios', error);
        res.status(500).send({mensagem: 'Erro ao criar todos os usuarios'})
    }
});

app.delete('/usuarios/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Usuario deletado com sucesso'});
    } catch (error) {
        console.error('Erro ao deletar o usuario', error);
        res.status(500).send({mensagem: 'Erro ao deletar o usuario'})
    }
});

app.put('/usuarios/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, datadenascimento, email, idade, signo, sexo } = req.body;
        await pool.query('UPDATE usuarios SET nome = $1, sobrenome = $2, datadenascimento = $3, email = $4, idade = $5, signo = $5, sexo = $6 WHERE id = $7', [nome, sobrenome, datadenascimento, email, idade, signo, sexo, id]);
        res.status(200).send({mensagem: 'Usuario editado com sucesso'})
    } catch (error) {
        console.error('Erro ao editar o usuario', error);
        res.status(500).send({mensagem: 'Erro ao editar o usuario'})
    }
});

app.get('/usuarios/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('SELECT FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Usuario deletado com sucesso'});
    } catch (error) {
        console.error('Erro ao obter usuario por id', error);
        res.status(500).send({mensagem: 'Erro ao obter usuario por id'})
    }
});

app.get('/', (req, res) => {
    res.send('Servidor está funcionando');
});

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`);
});