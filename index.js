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
    port: 7007,
});


function calculadorIdade(datadenascimento) {
    const diaAtual = new Date();
    let idade = diaAtual.getFullYear() - datadenascimento.getFullYear();
    const mesAtual = diaAtual.getMonth();
    const mesNascimento = datadenascimento.getMonth();
    if(mesNascimento > mesAtual || (mesNascimento === mesAtual && diaAtual.getDate() < datadenascimento.getDate())) {
        idade--;
      }
      return idade;
    }

function mostrarSigno(mes, dia) {
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
    return 'Aquário';
    } else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
    return 'Peixes';
    } else if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
    return 'Áries';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
    return 'Touro';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
    return 'Gêmeos';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
    return 'Câncer';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
    return 'Leão';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
    return 'Virgem';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
    return 'Libra';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
    return 'Escorpião';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
    return 'Sagitário';
    } else {
    return 'Capricórnio'
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
        const {nome, sobrenome, dataNascimento, email, sexo} = req.body;
        const datadenascimento = new Date(dataNascimento);
        const idade = calculadorIdade(datadenascimento);
        const signo = mostrarSigno(datadenascimento.getMonth() + 1, datadenascimento.getDate());

        await pool.query('INSERT INTO usuarios (nome, sobrenome, dataNascimento, email, idade, signo, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nome, sobrenome, dataNascimento, email, idade, signo, sexo]);
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
        const { nome, sobrenome, dataNascimento, email, sexo } = req.body;
        const datadenascimento = new Date(dataNascimento);
        const idade = calculadorIdade(datadenascimento);
        const signo = mostrarSigno(datadenascimento.getMonth() + 1, datadenascimento.getDate());

        await pool.query('UPDATE usuarios SET nome = $1, sobrenome = $2, dataNascimento = $3, email = $4, idade = $5, signo = $6, sexo = $7 WHERE id = $8', [nome, sobrenome, dataNascimento, email, idade, signo, sexo, id]);
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