# **API (Funções Serverless Vercel)**

Services/Projects

# Generic

## Introdução

Um guia simples de uso da Project G API

### **Convenções**

A URL base para enviar todas as requisições à API é **`https://projectg2.vercel.app/api/`**. É necessário o uso de HTTPS para todas as requisições à API.

A API do Projeto G segue convenções RESTful sempre que possível, com a maioria das operações realizadas por meio de requisições **`GET`**, **`POST`**, **`PATCH`** e **`DELETE`** em recursos de página e banco de dados. Os corpos de requisição e resposta são codificados em JSON.

**Convenções JSON**

- Recursos de nível superior são acessíveis por meio de uma propriedade CUID **`"id"`**.
- Os nomes das propriedades estão em **`camelCase`**.
- Valores temporais (datas e datetimes) são codificados em strings [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). Datetimes incluirão o valor do tempo (**`2020-08-12T02:12:33.231Z`**), enquanto datas incluirão apenas a data (**`2020-08-12`**).
- Os atributos de imagens

### ****Code samples & SDKs****

Todos recursos e código fonte então disponíveis no [repositório WEB](https://github.com/Gabriel-Spinola/Project-G-Web-Org)

**Destacando se:**

- [Esquema de banco de dados](https://github.com/Gabriel-Spinola/Project-G-Web-Org/blob/main/prisma/schema.prisma) (Migrações estão listadas nas pastas vizinhas)
- [Biblioteca de funcionalidades](https://github.com/Gabriel-Spinola/Project-G-Web-Org)
- [API Config](https://github.com/Gabriel-Spinola/Project-G-Web-Org/blob/main/lib/api/apiConfig.ts)

**Pasta API**

[](https://github.com/Gabriel-Spinola/Project-G-Web-Org/tree/main/app/api/services)

### **Paginação**

Endpoints que retornam listas de objetos suportam solicitações de paginação baseadas no seu scroll ou posição na página. Por padrão, é retornado 3 itens por chamada de API. Se o número de itens em uma resposta de um endpoint de suporte exceder o padrão, então uma integração pode usar a paginação para solicitar um conjunto específico de resultados e/ou limitar o número de itens retornados.

**SUPPORTED ENDPOINTS**

| Método HTTP | Endpoint |
| --- | --- |
|             GET  | services/posts/?page |
|             GET  | services/projects/:page/ |

## Limite de Requisições

### Rate Limits

Caso um usuário ultrapasse o limite de requisições será retornado o código de erro: `"rate_limited"` (HTTP status 429). O limite atual é de em média 100 requisições por minuto.

<aside>
❗ A taxa de requisições por minuto e sua implementação provavelmente será modificada no futuro.

</aside>

## Status Codes

Respostas HTTP.

### Código de sucesso

| HTTP Status | Description |
| --- | --- |
| 200 | Successfully processed request. |

### Códigos de erro

Tabela de erros com seus com seus respectivos status HTTP, códigos e dados retornados 

| HTTP Status  | code | data |
| --- | --- | --- |
| 400 | invalid_json | O corpo da requisições não pode ser transformado em JSON |
| 500 | Internal_server_error | Erro interno de servidor |
| 400 | invalid_request | Requisição inválida, ou falta de parâmetros obrigatórios. |
| 401 | unauthorized | O token de validação está incorreto, ou o usuário não tá autorização de acesso. |
| 429 | rate_limited | Limite de requisições por minuto ultrapassado |

# Objetos

# Services/Posts **(OBS: desenvolvido antes da adoção da arquitetura REST)**

### Trabalha com os posts de usuários

### Get

Parâmetros:

- Id `(opcional)`: ID do autor. Se fornecido, `busca posts apenas do autor especificado`.
- Page `(opcional)`: Número da página para paginação. Cada página contém 3 posts.

### Exemplos:

- Recuperar todos os posts:
`GET /api/services/posts/`
- Recuperar posts de um autor específico:
`GET /api/services/posts/?id=authorId`
- Recuperar posts paginados de um autor específico:
`GET /api/services/posts/?id=authorId&page=2`

### Response:

Um array de posts, cada um contendo as seguintes propriedades:

Exemplo em [modelo prisma](https://www.prisma.io/docs/concepts/components/prisma-schema): 

```scheme
	id        String   @id @default(cuid())
  content   String?
  images    String[]
  published Boolean  @default(false)

  tags String[]

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  likes Like[] @relation("LikedPost")
  pins  Pin[]  @relation("PinnedPost")

  author      User?     @relation("PostAuthor", fields: [authorId], references: [id], onDelete: Cascade)
  authorId    String?
  contributor User[]    @relation("PostContributor")
  comments    Comment[] @relation("CommentedPost")
```

Exemplo resposta em JSON:

```json
[
	{
	   "id": "clpn00ii40001civh5f1j9ykg",
	   "content": "testye2" ,
		 "images": ["posts/imagem1.png", "posts/image2.jpg"]
	   "likes": [
	       ...
	   ],
	   ...
  },
  {
	   "id": "I'm a cuid",
	   ...
   },
]
```

### Delete

`DELETE /api/services/posts`

Parâmetros:

- id `(obrigatório)`: ID do post a ser excluído.

### Exemplos:

- Excluir um post com ID "postId":
`DELETE /api/services/posts/?id=postId`

### Post

`POST /api/services/posts`

Parâmetros:

- id `(obrigatório)`: ID do autor do post.

### Examples:

- Um autor criando um post:
`POST /api/services/posts/?id=authorId`

# Services/User

### Get

`GET /api/services/users`

Parâmetros:

- Não é necessário.

### Exemplos:

- Requerendo Usuários:
`GET /api/services/users`
- Requerendo apenas um:
`GET /api/services/users/only/:userId`

### Response:

Em caso de GET sem parâmetro especial (Only), é retornado uma array de usuários. Ao contrário do Uso do Only, que retorna apenas um usuário de a cordo com o Id. 

Alguns dos parâmetros JSON retornados são privados, ou seja, só são retornados quando necessários. 

Exemplo em [modelo prisma](https://www.prisma.io/docs/concepts/components/prisma-schema): 

```scheme
	id       String  @id @default(cuid())
  name     String
  password String?
  image    String?

  followers Follows[] @relation("Follower")
  following Follows[] @relation("Following")

  likes Like[] @relation("LikedBy")
  pins  Pin[]  @relation("PinnedBy")

  title       String?
  description String?
  location    String?
  graduations String[]

  linkedinUrl  String?
  CREA         String? @unique
  siteUrl      String?
  contactPhone Int?
  profilePic   String?

  email         String    @unique
  emailVerified DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  position Positions @default(DefaultUser)

  accounts Account[]
  sessions Session[]

  authoredPosts    Post[] @relation("PostAuthor")
  contributedPosts Post[] @relation("PostContributor")

  authoredProjects    Project[] @relation("ProjectAuthor")
  contributedProjects Project[] @relation("ProjectContributor")

  authoredComments Comment[] @relation("CommentAuthor")

```

Exemplo resposta em JSON:

```json
[
	{
	   "id": "clpn00ii40001civh5f1j9ykg" ,
	   "name": "GuizinhoLindo" ,
	   "password": "SawddsSW231455123SGWESAf2" (Private) , 
	   ...
  },
  {
	   "id": "I'm a cuid",
	   ...
   },
]
```

### Patch

`PATCH /api/services/users`

Parâmetros:

- id `(obrigatório)`: ID do usuário a ser atualizado.
- Campos a serem mudados no usuário `São Passados através do body` `(Obrigatório)`.

### Examples:

- Atualizar um usuário:
`PATCH /api/services/users/:userId`

# Services/Projects

### Get

`GET /api/services/projects`

Parâmetros:

- Id `(obrigatório em alguns casos)`.

### Examples:

- Todos os projetos de um usuário:
`GET /api/services/projects/:userId`
- Todos os projetos de uma página:
`GET /api/services/projects/:pageId`
- Requerendo apenas um projeto:
`GET /api/services/users/only/:Id`

### Response:

Em caso de only, apenas um projeto é dado como resposta. Ao contrário disso, quando se passar um id, seja de pagina ou de usuário, todos os projetos alí presentes serão retornados.

Exemplo em [modelo prisma](https://www.prisma.io/docs/concepts/components/prisma-schema): 

```scheme
	id          String   @id @default(cuid())
  title       String
  description String?
  images      String[]
  files       String[]

  projectType ProjectType
  tags        String[]

  likes Like[] @relation("LikedProject")
  pins  Pin[]  @relation("PinnedProject")

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  author      User?     @relation("ProjectAuthor", fields: [authorId], references: [id], onDelete: Cascade)
  contributor User[]    @relation("ProjectContributor")
  comments    Comment[] @relation("CommentedProject")
```

Exemplo resposta em JSON:

```json
[
	{
		"id": "CUID",
		"title": "Eu Odeio Documentação",
		...
		"comments": [
			{
				"id": "aiodghasidaduoa12237123",
				...
			},
			{
				"id": "aiodghasidaduoa12237123",
				"content": "bla"
			},
		], 
		"author": {
			"name": "VitinhoDoCV", 
			"userId": "anjdhpio8yn-hrp´wu80gy" 
		},
	}
]
```

### Patch

`PATCH /api/services/projects`

Parâmetros:

- id `(obrigatório)`: ID do projeto a ser atualizado.
- Parâmetros para atualização `(opcionais)`: quando necessários virão do body.

### Examples:

- Atualizar um projeto:
`PATCH /api/services/projects/:projectId`

### Delete

`DELETE /api/services/projects`

Parâmetros:

- id `(obrigatório)`: ID do projeto a ser deletado.

### Examples:

- Deletar um projeto:
`DELETE /api/services/projects/:projectId`

### Post

`POST /api/services/projects`

Parâmetros:

- Parâmetros para atualização `(opcionais)`: quando necessários virão do body.

### Examples:

- Criar um projeto:
`POST /api/services/projects/`

# S3/Images

As imagens são guardadas dentro de um S3Bucket usando usando [supabase](https://supabase.com) como abstração, portanto só se guarda as URLs das imagens no banco de dados. 

### GET

`GET https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/`

# Authentication (Next Auth)

## Rota Key

`POST /api/key/` Retorna um payload JWT criptografado contendo a chave da API

## Rest API:

[REST API | NextAuth.js](https://next-auth.js.org/getting-started/rest-api)

## Providers:

[Credentials | NextAuth.js](https://next-auth.js.org/configuration/providers/credentials)

[Google | NextAuth.js](https://next-auth.js.org/providers/google)

[Email | NextAuth.js](https://next-auth.js.org/configuration/providers/email)

## Prisma Adapter

[Prisma Adapter | NextAuth.js](https://next-auth.js.org/v3/adapters/prisma)

[Endpoints](https://www.notion.so/83004d3fff214ee3abb1b04258724865?pvs=21)
