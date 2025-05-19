
# Projeto Login com Servlet Java e API REST 🔐☁️

## Descrição do projeto

Este projeto é uma aplicação web feita com Java Servlet que implementa um sistema de login.  
O servlet recebe dados do usuário (login e senha) via formulário HTML, envia esses dados para uma API REST externa em formato JSON, e processa a resposta para autenticar o usuário.

## Funcionalidades do projeto

- **Recepção dos dados do formulário:** o servlet captura o login e senha enviados pelo usuário.
- **Envio para API REST:** os dados são convertidos em JSON e enviados via requisição HTTP POST para a API.
- **Validação do login:** a API responde se o login foi bem-sucedido ou não.
- **Gerenciamento de sessão:** se o login for válido, uma sessão é criada para armazenar o usuário logado.
- **Resposta ao usuário:** exibe uma mensagem HTML personalizada de sucesso ou erro de login.

## Sobre a API REST utilizada

A API REST é responsável por validar as credenciais do usuário. Ela fica rodando no endereço:

```
http://127.0.0.1:3000/Login/
```

### Funcionalidades da API

- **Recebe requisições POST** com dados do usuário no formato JSON:
  - `login` (string): nome de usuário
  - `senha` (string): senha do usuário
- **Valida as credenciais** contra uma base de dados ou lógica interna.
- **Retorna uma resposta JSON** indicando sucesso ou falha no login.
- **Retorna dados do usuário**, como nome, para mostrar na interface caso o login seja válido.

### Exemplo de JSON enviado para a API

```json
{
  "login": "usuario123",
  "senha": "minhaSenha"
}
```

### Exemplo de JSON de resposta da API (sucesso)

```json
{
  "status": true,
  "nome": "Felipe Silva"
}
```

### Exemplo de JSON de resposta da API (falha)

```json
{
  "status": false,
  "mensagem": "Login ou senha inválidos"
}
```

## Tecnologias usadas

- **Java Servlet**: para criar o backend que processa os dados do login.
- **Jakarta Servlet API**: API para manipular requisições e respostas HTTP.
- **HttpClient do Java**: para enviar requisições HTTP para a API REST.
- **JSON (org.json)**: para converter objetos Java em JSON e vice-versa.
- **Servidor Tomcat ou similar**: para rodar o servlet.
- **API REST externa**: serviço que autentica os usuários.

## Estrutura do projeto

```
/src
  /view
    Login.java       --> Servlet que processa o login
  /model
    Usuario.java     --> Classe que representa o usuário e converte dados JSON
```

## Como rodar o projeto

1. **Execute a API REST** na URL `http://127.0.0.1:3000/Login/`.  
   *Essa API deve estar funcionando para que o login funcione corretamente.*

2. **Compile e implemente o projeto** no seu servidor servlet (ex: Apache Tomcat).

3. **Abra o navegador** e acesse a página do formulário de login que envia os dados para o servlet.

4. **Digite seu login e senha** no formulário e envie.

5. O servlet processará a requisição, enviará os dados para a API, e exibirá o resultado da autenticação.

## Detalhes do código

- O servlet `Login.java`:
  - Recebe os parâmetros `txtLogin` e `txtSenha` do formulário.
  - Cria um objeto `Usuario` e popula os dados.
  - Converte o objeto para JSON.
  - Usa `HttpClient` para enviar uma requisição POST para a API.
  - Recebe a resposta JSON da API e a processa para determinar se o login foi bem-sucedido.
  - Se sucesso, cria uma sessão para o usuário.
  - Exibe uma página HTML com mensagem de sucesso ou erro.

- A classe `Usuario.java`:
  - Tem atributos como login, senha e nome.
  - Métodos para converter para JSON (`toJson()`) e para preencher os dados a partir do JSON da API (`fromJsonLoginString()`).

## Como personalizar

- Modifique a URL da API no servlet (`apiUrl`).
- Adapte a classe `Usuario` para refletir os campos reais da sua API.
- Customize a interface HTML gerada no servlet para melhorar a experiência do usuário.
- Implemente mais funcionalidades no backend conforme sua necessidade (ex: logout, cadastro, etc).

## Termos importantes

- **Servlet:** programa Java que responde a requisições HTTP no servidor.
- **JSON:** formato para trocar dados de forma leve e estruturada.
- **HTTP POST:** método para enviar dados ao servidor.
- **Sessão:** forma de manter informações do usuário durante a navegação na web.
- **API REST:** serviço web que troca dados usando HTTP e JSON.

## Próximos passos sugeridos

- Criar páginas JSP ou HTML para o formulário de login.
- Implementar logout, com destruição da sessão.
- Adicionar tratamento para senhas (ex: hash).
- Implementar controle de acesso às páginas protegidas.
- Criar a API REST caso ainda não tenha, usando Node.js, Java Spring, etc.
