# API (Funções Serverless Vercel)
Important links : 
- [Database model](https://github.com/Gabriel-Spinola/Project-G-Web-Org/blob/main/prisma/schema.prisma)
- [Api Config](https://github.com/Gabriel-Spinola/Project-G-Web-Org/blob/main/lib/api/apiConfig.ts)


**BASE URL**: https://projectg2.vercel.app/api/services/

## Services/Posts (OBS: desenvolvido antes da adoção da arquitetura rest)
### **GET**
**Parâmetros**

- id (opcional): ID do autor. Se fornecido, busca posts apenas do autor especificado.
- page (opcional): Número da página para paginação. Cada página contém 3 posts.

#### Exemplos:
- Recuperar todos os posts:
`GET /api/services/posts/`
- Recuperar posts de um autor específico:
`GET /api/services/posts/?id=authorId`
- Recuperar posts paginados de um autor específico:
`GET /api/services/posts/?id=authorId&page=2`

#### Response
Um array de posts, cada um contendo as seguintes propriedades:
(Exemplo em [modelo prisma](https://www.prisma.io/docs/concepts/components/prisma-schema))
```schema
{
  id        String   @id @default(cuid())
  content   String?
  images    String[]
  published Boolean  @default(false)

 String tags[]

 createdAt DateTime @default (now ())
 updatedAt DateTime @default (now ()) @updatedAt

 likes Like[] @relation ("LikedPost")
 pins Pin[] @relation ("PinnedPost")

 authorId String?
 contributor User[] @relation ("PostContributor")
 comments Comment[] @relation ("CommentedPost")
}
```

Example in json
```
[
  {
   "id": "clpn00ii40001civh5f1j9ykg",
   "content": "testye2" ,
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

### **DELETE**
`DELETE /api/services/posts`

**Parâmetros**
- id (obrigatório): ID do post a ser excluído.

#### Exemplo
Excluir um post com ID "postId":
`DELETE /api/services/posts/?id=postId`

#### Resposta
Sucesso (Status HTTP 200):
Erro (Status HTTP 400):
