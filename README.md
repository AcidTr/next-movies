## Movies

O Movies lista filmes populares e permite a pesquisa dos filmes utilizando a base de dados do [The MovieDB](https://developers.themoviedb.org/3/getting-started/introduction).

É possível também favoritar filmes localmente.

## Desenvolvimento

### Implementação

A aplicação foi construída utilizando [Next.js](https://nextjs.org/) da Vercel, Typescript e SASS.

Esta disponível para testes no servidor da Vercel no seguinte [endereço](https://next-movies-rosy.vercel.app/).

### Rodando a aplicação localmente

Para rodar a aplicação basta clonar este repositório, instalar as depenências utilizando os comandos

```bash
npm i
```

ou

```bash
yarn
```

e depois

```bash
npm run dev
```

ou

```bash
yarn dev
```

Obs: Requer uma chave de API do The MoviesDB para funcionar.

Ela pode ser colocada no arquivo de ambiente de desenvolvimento local ```<rootDir>/.env.local```

No arquivo ```<rootDir>/.env.local.example``` tem um exemplo de como configurar a variável de ambiente


Após terminar a compilação do código, é possível acessar ela através do endereço [localhost:3000](http://localhost:3000/)

### Comandos para rodar a aplicação

##### Desenvolvimento

```bash
npm run dev
```

ou

```bash
yarn dev
```

Inicia o servidor de desenvolvimento na porta 3000 no [localhost](http://localhost:3000/)

##### Teste

```bash
npm run test
```

ou

```bash
yarn test
```

Incia os testes usando jest

##### Build

```bash
npm run build
```

ou

```bash
yarn build
```

Faz o build da aplicação para produção
##### Produção

```bash
npm run start
```

ou

```bash
yarn start
```

Inicia a aplicação em modo de produção. (Pré-requisito: comando de build tenha seido executado anteriomente)
