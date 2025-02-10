# API Flask para Gerenciamento de Criptomoedas

## Descrição do Projeto

Este projeto é uma API RESTful desenvolvida em Flask para gerenciar um sistema de carteiras de criptomoedas. A API permite operações CRUD (Criar, Ler, Atualizar, Deletar) em várias entidades, incluindo usuários, carteiras, criptoativos, relações entre carteiras e criptoativos, e transações.

## Funcionalidades

- Gerenciamento de Usuários
- Gerenciamento de Carteiras
- Gerenciamento de Criptoativos
- Gerenciamento de Relações entre Carteiras e Criptoativos
- Gerenciamento de Transações

## Tecnologias Utilizadas

- Python
- Flask
- PostgreSQL
- psycopg2
- python-dotenv

## Instalação

1. Clone o repositório:

``` 
git clone [https://github.com/seu-usuario/nome-do-repo.git](https://github.com/seu-usuario/nome-do-repo.git)
cd nome-do-repo
```

2. Crie um ambiente virtual e ative-o:

```
python -m venv venv source venv/bin/activate  # No Windows use `venv\Scripts\activate`
```

3. Instale as dependências:

```
pip install -r requirements.txt
```


4. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione:

```
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
```
Lembre-se de substituir ``` username ```, ``` password ```, ``` dbname ``` e ``` localhost ``` pelas suas credenciais no postgresSQL de verdade

OBS: Caso queira, confira o arquivo ```progDistConc2BimQuestao03db.sql``` para recriar o banco do projeto em um servidor de sua escolha para implementar.

## Uso

1. Inicie o servidor Flask:

``` flask run ```

Caso não funcione, tente:

``` python3 flask run ```


2. A API estará disponível em `http://127.0.0.1:5000`.

## Endpoints da API

### Usuários
- GET /api/usuarios - Lista todos os usuários (Também pode puxar um usuário específico através do ID)
- POST /api/usuarios - Cria um novo usuário
- GET /api/usuarios/<id> - Obtém detalhes de um usuário específico
- PUT /api/usuarios/<id> - Atualiza um usuário
- DELETE /api/usuarios/<id> - Deleta um usuário

### Carteiras
- GET /api/carteiras - Lista todas as carteiras (Também pode puxar uma carteira específica através do ID)
- POST /api/carteiras - Cria uma nova carteira
- GET /api/carteiras/<id> - Obtém detalhes de uma carteira específica
- PUT /api/carteiras/<id> - Atualiza uma carteira
- DELETE /api/carteiras/<id> - Deleta uma carteira

### Criptoativos
- GET /api/criptoativos - Lista todos os criptoativos (Também pode puxar umcriptoativo específico através do ID)
- POST /api/criptoativos - Cria um novo criptoativo
- GET /api/criptoativos/<id> - Obtém detalhes de um criptoativo específico
- PUT /api/criptoativos/<id> - Atualiza um criptoativo
- DELETE /api/criptoativos/<id> - Deleta um criptoativo

### Relações Carteira-Criptoativo
- GET /api/carteira_cripto - Lista todas as relações (Também pode puxar uma relação específica através do ID)
- POST /api/carteira_cripto - Cria uma nova relação
- PUT /api/carteira_cripto - Atualiza uma relação existente
- DELETE /api/carteira_cripto - Remove uma relação

### Transações
- GET /api/transacao?id=<id> - Lista todas as transações (Também pode puxar uma transação específica através do ID)
- POST /api/transacao - Cria uma nova transação
- GET /api/transacao<id> - Obtém detalhes de uma transação específica
- PUT /api/transacao/<id> - Atualiza uma transação
- DELETE /api/transacao/<id> - Deleta uma transação

### Histórico de Transações
- GET /api/historico_transacao?id=<id> - Exibe o Histórico de Transações de maneira mais formatada, mostrando os nomes das Carteiras (Também pode puxar uma transação específica através do ID)

## Testando a API

Para isso, você pode usar programas como por exemplo o [Insomnia](https://insomnia.rest/) ou então uma extensão no Visual Studio Code, como por exemplo o [ThunderClient](https://www.thunderclient.com/)

Outra opção, quando se está no Linux, é usar o comando ```curl```. Acesse este [link](https://www.hostinger.com.br/tutoriais/comando-curl-linux) para ler mais sobre o comando ```curl``` no Linux.