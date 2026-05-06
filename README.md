# Campaign Links API

API REST para gerenciamento dinâmico de links de campanha com parâmetros reutilizáveis.

## Tecnologias

- **Node.js** com **TypeScript**
- **Express** — framework HTTP
- **Prisma ORM 7** com driver adapter `@prisma/adapter-pg`
- **PostgreSQL** — banco de dados relacional
- **Argon2** — hash de senhas
- **JSON Web Token** — autenticação stateless
- **Zod** — validação de dados
- **Swagger UI** — documentação interativa da API
- **Docker** — ambiente de banco isolado

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/carlosuzeda/campaign-links-api
cd campaign-links-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/campaign_links_db"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3333
NODE_ENV="dev"
```

4. Suba o banco de dados:

```bash
docker compose up -d
```

5. Rode as migrations:

```bash
npx prisma migrate dev --name init
```

6. Gere o Prisma Client:

```bash
npx prisma generate
```

7. Inicie o servidor:

```bash
npm run dev
```

8. Popular o banco com dados de exemplo (opcional):

```bash
npm run seed
```

A API estará disponível em `http://localhost:3333`.
A documentação Swagger estará em `http://localhost:3333/docs`.

---

## Como testar com o Swagger

Acesse `http://localhost:3333/docs` no navegador. Siga a ordem abaixo:

### 1. Criar usuário

- Abra o endpoint `POST /auth/register`
- Clique em **Try it out**
- Preencha o body e clique em **Execute**

```json
{
  "name": "José Silva",
  "email": "jose@email.com",
  "password": "senha123"
}
```

### 2. Fazer login e obter o token

- Abra o endpoint `POST /auth/login`
- Clique em **Try it out**
- Preencha o body e clique em **Execute**

```json
{
  "email": "jose@email.com",
  "password": "senha123"
}
```

- Copie o valor do campo `token` da resposta

### 3. Autorizar o Swagger com o token

- Clique no botão **Authorize** no topo da página
- Cole o token no campo **Value** e clique em **Authorize**
- A partir daqui todos os endpoints protegidos já funcionam

### 4. Criar um projeto

- Abra `POST /projects`
- Clique em **Try it out**
- Preencha o body:

```json
{
  "name": "Campanha Black Friday"
}
```

- Copie o `id` retornado

### 5. Criar um link

- Abra `POST /projects/{projectId}/links`
- Cole o `id` do projeto no campo `projectId`
- Preencha o body:

```json
{
  "name": "Link Facebook",
  "baseUrl": "https://example.com"
}
```

- Copie o `id` do link retornado

### 6. Criar um parâmetro

- Abra `POST /parameters`
- Preencha o body:

```json
{
  "key": "utm_source",
  "value": "FB"
}
```

- Copie o `id` do parâmetro retornado

### 7. Vincular o parâmetro ao link

- Abra `POST /links/{id}/parameters/{parameterId}`
- Cole o `id` do link e o `id` do parâmetro nos campos correspondentes
- Clique em **Execute**

### 8. Definir um redirect (opcional)

- Abra `POST /links/{id}/redirect`
- Cole o `id` do link
- Preencha o body:

```json
{
  "destinationUrl": "https://loja.com/produto"
}
```

### 9. Gerar o link final

- Abra `GET /links/{id}/generate`
- Cole o `id` do link
- Clique em **Execute**
- A resposta será a URL final montada com todos os parâmetros:

```json
{
  "url": "https://example.com/?utm_source=FB&redirect=https://loja.com/produto"
}
```

---

## Endpoints

### Auth

| Método | Rota             | Descrição                             | Auth Requerido? |
| ------ | ---------------- | ------------------------------------- | --------------- |
| POST   | `/auth/register` | Cria novo usuário                     | ❌              |
| POST   | `/auth/login`    | Retorna token JWT e autentica usuário | ❌              |

### Projects

| Método | Rota            | Descrição                             | Auth Requerido? |
| ------ | --------------- | ------------------------------------- | --------------- |
| POST   | `/projects`     | Cria projeto                          | ✅              |
| GET    | `/projects`     | Lista projetos do usuário autenticado | ✅              |
| GET    | `/projects/:id` | Detalha um projeto específico         | ✅              |
| DELETE | `/projects/:id` | Remove um projeto                     | ✅              |

### Links

| Método | Rota                         | Descrição       | Auth Requerido? |
| ------ | ---------------------------- | --------------- | --------------- |
| POST   | `/projects/:projectId/links` | Cria link       | ✅              |
| GET    | `/projects/:projectId/links` | Lista links     | ✅              |
| PUT    | `/links/:id`                 | Atualiza link   | ✅              |
| DELETE | `/links/:id`                 | Remove link     | ✅              |
| GET    | `/links/:id/generate`        | Gera link final | ✅              |

### Parameters

| Método | Rota                                 | Descrição                 | Auth Requerido? |
| ------ | ------------------------------------ | ------------------------- | --------------- |
| POST   | `/parameters`                        | Cria parâmetro            | ✅              |
| GET    | `/parameters`                        | Lista parâmetros          | ✅              |
| POST   | `/links/:id/parameters/:parameterId` | Vincula parâmetro ao link | ✅              |
| DELETE | `/links/:id/parameters/:parameterId` | Desvincula parâmetro      | ✅              |

### Redirect

| Método | Rota                  | Descrição       | Auth Requerido? |
| ------ | --------------------- | --------------- | --------------- |
| POST   | `/links/:id/redirect` | Define redirect | ✅              |
| DELETE | `/links/:id/redirect` | Remove redirect | ✅              |

---

## Estrutura do projeto

```
src/
├── @types/             # Extensão de tipos do Express (req.userId)
├── controllers/        # Recebem req, chamam use-case, devolvem res
│   ├── auth/
│   ├── links/
│   ├── parameters/
│   ├── projects/
│   └── redirect/
├── factories/          # Instanciam repositories e injetam nos use-cases
│   ├── auth/
│   ├── links/
│   ├── parameters/
│   ├── projects/
│   └── redirect/
├── lib/                # Configurações de bibliotecas (Prisma, JWT, Swagger)
├── middlewares/        # Autenticação JWT e tratamento global de erros
├── repositories/       # Contratos que definem o que cada repository deve fazer
│   └── prisma/         # Implementações concretas usando Prisma
├── routes/             # Definição de endpoints com validação Zod
│   ├── auth/
│   ├── links/
│   ├── parameters/
│   ├── projects/
│   ├── redirect/
│   └── routes.ts
├── use-cases/          # Lógica de negócio da aplicação
│   ├── auth/
│   ├── links/
│   ├── parameters/
│   ├── projects/
│   └── redirect/
├── utils/              # Funções utilitárias (hash, build-url, erros, async-handler)
├── app.ts              # Configuração do Express
├── env.ts              # Validação de variáveis de ambiente com Zod
└── server.ts           # Inicialização do servidor
```

---

## Perguntas conceituais

### 1. Como você modelou as entidades?

O sistema é composto por seis entidades principais:

- **User** — representa o usuário autenticado. Possui email único e senha armazenada com hash Argon2.
- **Project** — agrupa links de uma mesma campanha. Pertence a um usuário.
- **Link** — estrutura reutilizável com URL base. Pertence a um projeto.
- **Parameter** — par chave/valor reutilizável (ex: `utm_source=FB`). Existe de forma independente e pode ser vinculado a múltiplos links.
- **LinkParameter** — tabela pivot que representa a relação N:M entre Link e Parameter. Possui constraint única `(linkId, parameterId)` para evitar duplicatas.
- **Redirect** — URL de destino opcional vinculada a um link via relação 1:1.

A decisão de separar `Parameter` como entidade independente é central no design: um parâmetro criado uma vez pode ser reutilizado em quantos links forem necessários, sem duplicação de dados.

### 2. Quais decisões você tomou e por quê?

**Argon2 no lugar de bcrypt**
Argon2 é o algoritmo vencedor da Password Hashing Competition (2015) e é considerado o estado da arte em hash de senhas. É resistente a ataques de GPU e side-channel, tornando-o superior ao bcrypt para aplicações modernas.

**JWT stateless**
A autenticação via JWT elimina a necessidade de armazenar sessões no banco. O token carrega o `userId` no campo `sub` (subject), padrão da especificação JWT, e expira em 7 dias.

**Prisma 7 com driver adapter**
Utilizei o Prisma 7 com `@prisma/adapter-pg` e `pg.Pool`, que oferece controle de pool de conexões mais eficiente do que o driver padrão do Prisma, evitando esgotamento de conexões em ambiente de produção.

**Validação de ambiente com Zod**
Todas as variáveis de ambiente são validadas na inicialização via Zod. Se alguma variável obrigatória estiver ausente, o servidor não sobe e exibe exatamente qual variável está faltando (evitando erros silenciosos em produção).

**Arquitetura em camadas**
O projeto segue separação clara de responsabilidades: `routes → controllers → use-cases → repositories`. Cada camada tem uma única responsabilidade. Isso facilita manutenção, testes e evolução do código sem efeitos colaterais.

**Repository pattern com interfaces**
Os use-cases dependem de interfaces, não de implementações concretas. Isso significa que a lógica de negócio não sabe se os dados vêm do PostgreSQL, de outro banco ou de um mock em testes. A implementação concreta é injetada via factory.

**Factories com injeção de dependência**
Cada factory instancia os repositories necessários e os injeta no use-case correspondente. Isso centraliza a criação de objetos e torna trivial a troca de implementações. Em testes, basta passar um repository mock para a factory.

**AppError centralizado**
Todos os erros de negócio são lançados como `AppError` com status HTTP explícito. O `errorMiddleware` captura qualquer erro da aplicação e formata a resposta de forma consistente.

**asyncHandler**
O Express não captura erros em funções assíncronas automaticamente. O `asyncHandler` é um wrapper que garante que qualquer `Promise` rejeitada seja passada ao `next()`, chegando corretamente ao `errorMiddleware`.

**Docker para o banco**
O uso do Docker Compose garante que qualquer pessoa consiga rodar o projeto com um único comando, sem precisar instalar e configurar o PostgreSQL localmente.

### 3. Como sua solução resolve o problema de escala na edição de links?

O problema original é: alterar um parâmetro em muitos links exige edição manual de cada um.

A solução está na modelagem. Como `Parameter` é uma entidade independente vinculada aos links via tabela pivot `LinkParameter`, alterar o valor de um parâmetro reflete automaticamente em todos os links que o utilizam, sem tocar em nenhum link individualmente.

Exemplo prático: se 500 links usam o parâmetro `utm_source=GoogleAds` e a campanha migra para o Facebook, basta atualizar o valor do parâmetro uma única vez. Todos os 500 links passam a gerar `utm_source=FB` automaticamente no endpoint `/generate`.

Além disso, o endpoint `GET /links/:id/generate` monta a URL dinamicamente em tempo de requisição, nunca armazenando o link final. Isso significa que qualquer mudança em parâmetros ou redirect é refletida imediatamente, sem necessidade de recalcular ou atualizar registros em cascata.

---

## Diagrama de entidades

![Diagrama de entidades](docs/diagram.png)

Todos os relacionamentos usam `onDelete: Cascade`. Ao deletar um usuário, seus projetos são deletados. Ao deletar um projeto, seus links são deletados. Sem registros órfãos no banco.
