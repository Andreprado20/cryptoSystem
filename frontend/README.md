# Gerenciador de Carteira de Criptomoedas (Cryptocurrency Wallet Manager)

[English version below](#cryptocurrency-wallet-manager)

## Sobre o Projeto

Este é um aplicativo web desenvolvido com Next.js para gerenciar carteiras de criptomoedas. O sistema permite o gerenciamento completo de usuários, carteiras, criptoativos e transações, oferecendo uma interface intuitiva para realizar operações CRUD (Criar, Ler, Atualizar, Deletar) em todas as entidades do sistema.

### Funcionalidades

- Gerenciamento de usuários
- Gerenciamento de carteiras
- Controle de criptoativos
- Registro e acompanhamento de transações
- Histórico detalhado de transações
- Interface responsiva e amigável
- Notificações em tempo real das operações

## Pré-requisitos

- Node.js (versão 14.0 ou superior)
- npm ou yarn
- Git

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Instale as dependências específicas do projeto:
```bash
npm install axios @radix-ui/react-tabs @radix-ui/react-dialog react-toastify
# ou
yarn add axios @radix-ui/react-tabs @radix-ui/react-dialog react-toastify
```

## Configuração

1. Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_API_BASE_URL=https://prog-dist-conc03.vercel.app/api
```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

2. Acesse `http://localhost:3000` no seu navegador

## Estrutura do Projeto

O projeto é organizado em diferentes seções:

- **Usuários**: Gerenciamento de contas de usuários
- **Carteiras**: Controle de carteiras de criptomoedas
- **Criptoativos**: Cadastro e gestão de diferentes criptomoedas
- **Histórico de Transações**: Registro de todas as operações realizadas
- **Transações**: Gerenciamento de transferências, compras e vendas

---

# Cryptocurrency Wallet Manager

## About the Project

This is a web application developed with Next.js for managing cryptocurrency wallets. The system allows complete management of users, wallets, crypto assets, and transactions, offering an intuitive interface to perform CRUD operations (Create, Read, Update, Delete) on all system entities.

### Features

- User management
- Wallet management
- Crypto assets control
- Transaction registration and tracking
- Detailed transaction history
- Responsive and user-friendly interface
- Real-time operation notifications

## Prerequisites

- Node.js (version 14.0 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone [REPOSITORY_URL]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install specific project dependencies:
```bash
npm install axios @radix-ui/react-tabs @radix-ui/react-dialog react-toastify
# or
yarn add axios @radix-ui/react-tabs @radix-ui/react-dialog react-toastify
```

## Configuration

1. Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_BASE_URL=https://prog-dist-conc03.vercel.app/api
```

## Running the Project

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Access `http://localhost:3000` in your browser

## Project Structure

The project is organized into different sections:

- **Users**: User account management
- **Wallets**: Cryptocurrency wallet control
- **Crypto Assets**: Registration and management of different cryptocurrencies
- **Transaction History**: Record of all operations performed
- **Transactions**: Management of transfers, purchases, and sales