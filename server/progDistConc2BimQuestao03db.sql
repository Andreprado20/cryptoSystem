drop table if exists usuario cascade;
drop table if exists carteira cascade;
drop table if exists criptoativo cascade;
drop table if exists carteira_cripto cascade;
drop table if exists transacao cascade;

-- Tabela de usuários
CREATE TABLE "usuario" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL,
    "login" VARCHAR(50) NOT NULL UNIQUE,
    "senha" VARCHAR(20) NOT NULL
);

-- Tabela de carteiras
CREATE TABLE "carteira" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE
);

-- Tabela de criptoativos
CREATE TABLE "criptoativo" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL UNIQUE,
    "codigo" VARCHAR(10) NOT NULL,
    "preco" DECIMAL(30,8) NOT NULL
);

-- Tabela de relação carteira-criptoativos
CREATE TABLE "carteira_cripto" (
    "id_carteira" INTEGER NOT NULL,
    "id_criptoativo" INTEGER NOT NULL,
    "quantidade" DECIMAL(30,8) NOT NULL DEFAULT 0,
    PRIMARY KEY ("id_carteira", "id_criptoativo"),
    FOREIGN KEY ("id_carteira") REFERENCES "carteira"("id") ON DELETE CASCADE,
    FOREIGN KEY ("id_criptoativo") REFERENCES "criptoativo"("id") ON DELETE CASCADE
);

-- Tabela de transações
CREATE TABLE "transacao" (
    "id" SERIAL PRIMARY KEY,
    "id_carteira_origem" INTEGER,
    "id_carteira_destino" INTEGER,
    "id_criptoativo" INTEGER NOT NULL,
    "quantidade" DECIMAL(30,8) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL CHECK (tipo IN ('compra', 'venda', 'transferencia')),
    "data" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("id_carteira_origem") REFERENCES "carteira"("id") ON DELETE SET NULL,
    FOREIGN KEY ("id_carteira_destino") REFERENCES "carteira"("id") ON DELETE SET NULL,
    FOREIGN KEY ("id_criptoativo") REFERENCES "criptoativo"("id") ON DELETE CASCADE
);


-- Inserindo usuários
INSERT INTO "usuario" ("nome", "login", "senha") VALUES 
('João Silva', 'joao', 'senha123'),
('Maria Oliveira', 'maria', 'senha456'),
('Carlos Souza', 'carlos', 'senha789');

-- Inserindo carteiras
INSERT INTO "carteira" ("nome", "id_usuario") VALUES
('Carteira do João', 1),
('Carteira da Maria', 2),
('Carteira do Carlos', 3);

-- Inserindo criptoativos
INSERT INTO "criptoativo" ("nome", "codigo", "preco") VALUES
('Bitcoin', 'BTC', 35000.50),
('Ethereum', 'ETH', 2500.75),
('Litecoin', 'LTC', 180.30);

-- Inserindo relação carteira-criptoativos
INSERT INTO "carteira_cripto" ("id_carteira", "id_criptoativo", "quantidade") VALUES
(1, 1, 0.5), -- João possui 0.5 BTC
(1, 2, 1.2), -- João possui 1.2 ETH
(2, 1, 0.3), -- Maria possui 0.3 BTC
(2, 3, 5.0), -- Maria possui 5 LTC
(3, 2, 2.5); -- Carlos possui 2.5 ETH

-- Inserindo transações
INSERT INTO "transacao" ("id_carteira_origem", "id_carteira_destino", "id_criptoativo", "quantidade", "tipo", "data") VALUES
(1, 2, 1, 0.1, 'transferencia', '2024-11-01 10:00:00'), -- João transferiu 0.1 BTC para Maria
(NULL, 1, 3, 3.0, 'compra', '2024-11-05 12:30:00'), -- João comprou 3 LTC
(3, NULL, 2, 1.0, 'venda', '2024-11-10 14:45:00'); -- Carlos vendeu 1 ETH

-- Queries de seleção para visualizar os dados
-- Listar todos os usuários
SELECT * FROM "usuario";

-- Listar todas as carteiras com seus respectivos usuários
SELECT c.id AS carteira_id, c.nome AS carteira_nome, u.nome AS usuario_nome
FROM "carteira" c
JOIN "usuario" u ON c.id_usuario = u.id;

-- Listar todos os criptoativos
SELECT * FROM "criptoativo";

-- Listar os criptoativos em cada carteira
SELECT c.nome AS carteira_nome, cr.nome AS criptoativo, cc.quantidade
FROM "carteira_cripto" cc
JOIN "carteira" c ON cc.id_carteira = c.id
JOIN "criptoativo" cr ON cc.id_criptoativo = cr.id;

-- Exibir o histórico de transações
SELECT t.id AS transacao_id, 
       co.nome AS carteira_origem, 
       cd.nome AS carteira_destino, 
       cr.nome AS criptoativo, 
       t.quantidade, 
       t.tipo, 
       t.data
FROM "transacao" t
LEFT JOIN "carteira" co ON t.id_carteira_origem = co.id
LEFT JOIN "carteira" cd ON t.id_carteira_destino = cd.id
JOIN "criptoativo" cr ON t.id_criptoativo = cr.id;

-- Consultar saldo de criptoativos em uma carteira específica (exemplo: Carteira da Maria)
SELECT cr.nome AS criptoativo, cc.quantidade
FROM "carteira_cripto" cc
JOIN "criptoativo" cr ON cc.id_criptoativo = cr.id
WHERE cc.id_carteira = 2;

