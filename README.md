# Aplicação Angular CRUD com Autenticação e Controle de Permissão

Esta é uma pequena aplicação front-end CRUD para gerenciar registros bancários com autenticação e controle de permissão. Ela é desenvolvida utilizando os frameworks Angular 15 e Bootstrap 5.

<p align="center">
  <img src="src\assets\layout.jpg" alt="Descrição da imagem">
</p>

## Escopo

A aplicação inclui os seguintes componentes:

- Formulário de Login
- Formulário Principal
- Formulário de Listagem de Registros
- Formulário de Detalhes do Registro

## Template

Foi criado um template personalizado para aplicação

## Detalhes da Atividade

A aplicação é baseada em autenticação OAuth2, onde você precisará fornecer um clientId, clientSecret, nome de usuário e senha para obter um token de acesso. Esse token será retornado pela API de autenticação e será usado para autorizar suas solicitações aos recursos da aplicação.

O token de acesso será no formato JWT (JSON Web Token) e conterá as informações das roles do usuário. As roles definem as permissões de CRUD (Create, Read, Update, Delete) que o usuário possui na aplicação.

Assim, a aplicação permite autenticar os usuários, controlar suas permissões com base nas roles, e realizar operações de CRUD nos registros bancários por meio da API.

## Documentação

### Usuários

| Usuário | Descrição                    |
| ------- | ---------------------------- |
| admin   | Administrador - Acesso total |
| normal  | Normal - Somente leitura     |

### Roles

| Usuário | Roles                                                          |
| ------- | -------------------------------------------------------------- |
| admin   | ROLE_BANCO_LST, ROLE_BANCO_ADD, ROLE_BANCO_EDT, ROLE_BANCO_DEL |
| normal  | ROLE_BANCO_LST                                                 |

### API de Autenticação

| Parâmetro        | Valor                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Grant Type       | password                                                                                                                                         |
| Access Token URL | [http:[private-url]/realms/[name-service]/protocol/openid-connect/token](http:[private-url]/realms/[name-service]/protocol/openid-connect/token) |
| Client ID        | [private]-web                                                                                                                                    |
| Client Secret    | [private-hash]                                                                                                                                   |
| Username         | admin ou normal                                                                                                                                  |
| Password         | 123@teste                                                                                                                                        |
| Scope            | [private]-web-roles                                                                                                                              |

### CRUD API

| Method | URL             | HTTP Responses     |
| ------ | --------------- | ------------------ |
| GET    | /v1/bancos      | 200, 401, 403      |
| POST   | /v1/bancos      | 201, 400, 401, 403 |
| GET    | /v1/bancos/{id} | 200, 401, 403, 404 |
| PUT    | /v1/bancos/{id} | 200, 400, 401, 403 |
| DELETE | /v1/bancos/{id} | 200, 401, 403, 404 |

# PrincetonLemitar

## Como executar a aplicação

Para executar a aplicação, siga as etapas abaixo:

1. Instale as dependências do projeto executando o seguinte comando no terminal:

```
npm i
```

2. Configure as variáveis de ambiente:

- Execute o comando a seguir para gerar os arquivos de ambiente:

  ```
  ng generate environments
  ```

- Localize os arquivos `environments.ts` e `environments.development.ts` dentro da pasta `src/environments`.

- Adicione as seguintes variáveis nos arquivos de ambiente:

  ```typescript
  export const environment = {
    production: true,
    apiUrl: "http://[private-url]",
    oauth2AccessTokenUrl: "http://[private-url]/realms/[name-service]/protocol/openid-connect/token",
    oauth2ClientId: "[private]-web",
    oauth2ClientSecret: "[private-hash]",
  };
  ```

3. Execute a aplicação:

- No terminal, execute o comando abaixo:

  ```
  ng serve
  ```

- Após a compilação ser concluída com sucesso, acesse a aplicação em `http://localhost:4200`.

Certifique-se de substituir `[private-url]`, `[name-service]`, `[private]-web` e `[private-hash]` pelas informações corretas de acordo com a configuração fornecida.
