Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

Instale as dependências do projeto: npm install express pg

Configure as variáveis de ambiente:

PORT: Porta em que o servidor será executado.
Dados de acesso ao banco de dados PostgreSQL (user, host, database, password, port).


Comandos necessários:

npm init -y

npm install express pg

npm install -g nodemon


Pasta database:
No arquivo script.sql ficam todos as querys que fazemos nos PostgreSQL.

POST: cria um usuário.

GET: retorna os usuários.

DELETE: deleta um usuário pelo id.

PUT: atualiza/edita um usuário pelo id.