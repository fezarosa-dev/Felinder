const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const chalkImport = require("chalk");
const chalk = chalkImport.default ? chalkImport.default : chalkImport;
const Banco = require('./src/model/Banco');


const UsuarioDAO = require('./src/controller/UsuarioDAO');
const Usuario = require("./src/model/Usuario");

// Middlewares
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * @route GET /Usuario/:cpf
 * @description Retorna os dados do usuário pelo CPF
 */
app.get("/Usuario/:cpf", async function (req, res) {
    const { cpf } = req.params;
    let hoje = new Date();
    let usuario;
    let usuarioDAO;
    let ipCliente = "";

    try {
        ipCliente = req.socket.remoteAddress ||
            (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.connection.socket?.remoteAddress;

        usuarioDAO = new UsuarioDAO();
        usuario = await usuarioDAO.listar(cpf);

        if (usuario != null) {
            fs.appendFileSync("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Encontrou ${JSON.stringify(usuario.toRecord())}`);
            
            console.log(chalk.green("🟢=========================================================="));
            console.log(chalk.green(`✔️  CPF encontrado: ${cpf}`));
            console.log(chalk.blue(`🧍 Usuário: ${JSON.stringify(usuario.toRecord())}`));
            console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
            console.log(chalk.green("🟢=========================================================="));

            return res.json({ 'dados': usuario.toRecord() });
        } else {
            fs.appendFileSync("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Não encontrou cpf = ${cpf}`);
            
            console.log(chalk.red("🔴=========================================================="));
            console.log(chalk.red(`❌  CPF não encontrado: ${cpf}`));
            console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
            console.log(chalk.red("🔴=========================================================="));

            return res.json({ 'dados': null });
        }
    } catch (erro) {
        console.log(chalk.bgRed.white("❗=========================================================="));
        console.error(chalk.bgRed.white(`🚨 Erro ao processar requisição: ${erro.message}`));
        console.log(chalk.bgRed.white("❗=========================================================="));
    }
});



/**
 * @route POST /Usuario
 * @description Cadastra um novo usuário
 */
app.post("/Usuario", async function (req, res) {
    const { cpf, senha, login, nome, cep, rua, bairro, cidade, numero, r1, r2, r3 } = req.body;
    let hoje = new Date();
    let usuarioDAO;
    let ipCliente = "";

    try {
        ipCliente = req.socket.remoteAddress ||
            (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.connection.socket?.remoteAddress;

        const usuario = new Usuario();
        usuario.cpf = cpf;
        usuario.senha = senha;
        usuario.login = login;
        usuario.nome = nome;
        usuario.cep = cep;
        usuario.rua = rua;
        usuario.bairro = bairro;
        usuario.cidade = cidade;
        usuario.numero = numero;
        usuario.r1 = r1;
        usuario.r2 = r2;
        usuario.r3 = r3;

        usuarioDAO = new UsuarioDAO();
        await usuarioDAO.inserir(usuario);

        fs.appendFileSync("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Cadastrou ${JSON.stringify(usuario.toRecord())}`);

        console.log(chalk.green("🟢=========================================================="));
        console.log(chalk.green(`✔️  Usuário cadastrado com sucesso: ${cpf}`));
        console.log(chalk.blue(`🧍 Usuário: ${JSON.stringify(usuario.toRecord())}`));
        console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
        console.log(chalk.green("🟢=========================================================="));

        return res.status(201).json({ 'message': 'Usuário cadastrado com sucesso' });
    } catch (erro) {
        console.log(chalk.bgRed.white("❗=========================================================="));
        console.error(chalk.bgRed.white(`🚨 Erro ao cadastrar usuário: ${erro.message}`));
        console.log(chalk.bgRed.white("❗=========================================================="));
        return res.status(500).json({ 'error': 'Erro ao cadastrar usuário' });
    }
});
function formatarCPF(cpf) {
  // Remove qualquer coisa que não seja número
  cpf = cpf.replace(/\D/g, "");

  // Aplica a máscara: 000.000.000-00
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

app.get("/UsuarioVerificar/:cpf", async function (req, res) {
    const cpfRecebido = req.params.cpf;
    const cpfFormatado = formatarCPF(cpfRecebido); // FORMATAR AQUI

    let hoje = new Date();
    let usuario;
    let usuarioDAO;
    let ipCliente = "";

    try {
        ipCliente = req.socket.remoteAddress ||
            (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.connection.socket?.remoteAddress;

        usuarioDAO = new UsuarioDAO();
        usuario = await usuarioDAO.listar(cpfFormatado);  // Usa CPF formatado para buscar

        if (usuario != null) {
            fs.appendFileSync("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Encontrou ${JSON.stringify(usuario.toRecord())}`);
            
            console.log(chalk.green("🟢=========================================================="));
            console.log(chalk.green(`✔️  CPF encontrado: ${cpfFormatado}`));
            console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
            console.log(chalk.green("🟢=========================================================="));

            return res.json({ 'dados': "CPF Encontrado" });
        } else {
            fs.appendFileSync("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Não encontrou cpf = ${cpfFormatado}`);
            
            console.log(chalk.red("🔴=========================================================="));
            console.log(chalk.red(`❌  CPF não encontrado: ${cpfFormatado}`));
            console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
            console.log(chalk.red("🔴=========================================================="));

            return res.json({ 'dados': null });
        }
    } catch (erro) {
        console.log(chalk.bgRed.white("❗=========================================================="));
        console.error(chalk.bgRed.white(`🚨 Erro ao processar requisição: ${erro.message}`));
        console.log(chalk.bgRed.white("❗=========================================================="));
    }
});

// Função para formatar CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for número
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}






app.get("/UsuarioVerificarLogin/:login", async function (req, res) {
  const { login } = req.params;
  const hoje = new Date();
  let ipCliente =
    req.headers["x-forwarded-for"]?.split(",").pop() ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    "IP não identificado";

  try {
    const usuarioDAO = new UsuarioDAO();
    const usuario = await usuarioDAO.UsuarioVerificar(login);

    if (usuario != null) {
      const mensagemLog = `${hoje.toLocaleString()}: IP = ${ipCliente} -> Encontrou ${JSON.stringify(usuario.toRecord())}`;
      fs.appendFileSync("logAPI.txt", `\n${mensagemLog}`);

      console.log(chalk.green("🟢=========================================================="));
      console.log(chalk.green(`✔️  Login encontrado: ${login}`));
      console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
      console.log(chalk.green("🟢=========================================================="));

      return res.json({ dados: "login Encontrado" });
    } else {
      const mensagemLog = `${hoje.toLocaleString()}: IP = ${ipCliente} -> Não encontrou login = ${login}`;
      fs.appendFileSync("logAPI.txt", `\n${mensagemLog}`);

      console.log(chalk.red("🔴=========================================================="));
      console.log(chalk.red(`❌  Login não encontrado: ${login}`));
      console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
      console.log(chalk.red("🔴=========================================================="));

      return res.json({ dados: null });
    }
  } catch (erro) {
    console.log(chalk.bgRed.white("❗=========================================================="));
    console.error(chalk.bgRed.white(`🚨 Erro ao processar requisição: ${erro.message}`));
    console.log(chalk.bgRed.white("❗=========================================================="));
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
});


/**
 * @route POST /Cadastro
 * @description Cadastra um novo usuário
 * @param {string} cpf - CPF do usuário
 * @param {string} senha - Senha do usuário
 * @param {string} login - Login do usuário
 * @param {string} nome - Nome do usuário
 * @param {string} cep - CEP do usuário
 * @param {string} rua - Rua do usuário
 *  @param {string} bairro - Bairro do usuário
 * @param {string} cidade - Cidade do usuário
 * @param {string} numero - Número do usuário
 * @param {string} r1 - Resposta 1 do usuário
 * @param {string} r2 - Resposta 2 do usuário
 * @param {string} r3 - Resposta 3 do usuário
 * @returns {object} - Mensagem de sucesso ou erro
 * @throws {Error} - Se ocorrer um erro ao cadastrar o usuário
 * */

app.post("/Cadastro", async function (req, res) {
    // 1. Pega os dados do corpo da requisição (JSON enviado)
    const { cpf, senha, login, nome, cep, rua, bairro, cidade, numero, r1, r2, r3 } = req.body;

    let hoje = new Date();
    let usuarioDAO;
    let ipCliente = "";

    try {
        // 2. Pega o IP do cliente que fez a requisição (para log)
        ipCliente = req.socket.remoteAddress ||
            (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.connection.socket?.remoteAddress;

        // 3. Cria um objeto usuário com os dados recebidos
        const usuario = new Usuario();
        usuario.cpf = cpf;
        usuario.senha = senha;
        usuario.login = login;
        usuario.nome = nome;
        usuario.cep = cep;
        usuario.rua = rua;
        usuario.bairro = bairro;
        usuario.cidade = cidade;
        usuario.numero = numero;
        usuario.r1 = r1;
        usuario.r2 = r2;
        usuario.r3 = r3;

        // 4. Salva o usuário no banco (com o DAO)
        usuarioDAO = new UsuarioDAO();
        await usuarioDAO.inserir(usuario);

        // 5. Loga a ação (salva num arquivo)
        fs.appendFileSync("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Cadastrou ${JSON.stringify(usuario.toRecord())}`);

        // 6. Mostra mensagem no console e responde sucesso para quem chamou a API
        console.log(chalk.green("🟢=========================================================="));
        console.log(chalk.green(`✔️  Usuário cadastrado com sucesso: ${cpf}`));
        console.log(chalk.blue(`🧍 Usuário: ${JSON.stringify(usuario.toRecord())}`));
        console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
        console.log(chalk.green("🟢=========================================================="))
        return res.status(201).json({ 'dados': 'Usuário cadastrado com sucesso' });

    } catch (erro) {
        // Se der erro, mostra no console e responde erro para quem chamou a API
        console.log(chalk.bgRed.white("❗=========================================================="));
        console.error(chalk.bgRed.white(`🚨 Erro ao cadastrar usuário: ${erro.message}`));
        console.log(chalk.bgRed.white("❗=========================================================="));
        return res.status(500).json({ 'dados': 'Erro ao cadastrar usuário' });
    }
});

app.post("/Login", async function (req, res) {
    const { login, senha } = req.body;
    let usuarioDAO;
    let hoje = new Date();
    let ipCliente = "";

    try {
        // 2. Pega o IP do cliente que fez a requisição (para log)
        ipCliente = req.socket.remoteAddress ||
            (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.connection.socket?.remoteAddress;

        usuarioDAO = new UsuarioDAO();
        const usuario = await usuarioDAO.login(login, senha);
        if (usuario != null) {
            // 5. Loga a ação (salva num arquivo)
            fs.appendFileSync("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Fez login ${JSON.stringify(usuario.toRecord())}`);

            // 6. Mostra mensagem no console e responde sucesso para quem chamou a API
            console.log(chalk.green("=========================================================="));
            console.log(chalk.green(`✔️  Fez login com sucesso: ${login}`));
            console.log(chalk.blue(`🧍 Usuário: ${JSON.stringify(usuario.toRecord())}`));
            console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
            console.log(chalk.green("=========================================================="));

            return res.json(usuario.toRecord());
        } else {
            return res.status(404).json({"status": false});
        }
    } catch (erro) {
        // Se der erro, mostra no console e responde erro para quem chamou a API
        console.log(chalk.bgRed.white("❗=========================================================="));
        console.error(chalk.bgRed.white(`🚨 Erro ao fazer login: ${erro.message}`));
        console.log(chalk.bgRed.white("❗=========================================================="));
        return res.status(500).json({ 'dados': 'Erro ao fazer login' });
    }
});


app.get("/ListarTodos", async function (req, res) {
  let usuarioDAO;
  let hoje = new Date();
  let ipCliente = "";

  try {
    // Pega IP do cliente
    ipCliente = req.socket.remoteAddress ||
                (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
                req.connection.remoteAddress ||
                req.connection.socket?.remoteAddress || 'IP não encontrado';

    usuarioDAO = new UsuarioDAO();
    const usuarios = await usuarioDAO.ListarTodos();

    // Log da ação no arquivo (modo assíncrono)
    fs.appendFile("logAPI.txt", `\n${hoje.toLocaleString()}: IP = ${ipCliente} -> Listou todos os usuários`, (err) => {
      if (err) console.error(chalk.bgRed.white(`Erro ao gravar log: ${err.message}`));
    });

    // Log no console
    console.log(chalk.green("🟢=========================================================="));
    console.log(chalk.green(`✔️  Listou todos os usuários`));
    console.log(chalk.cyan(`🌐 IP do cliente: ${ipCliente}`));
    console.log(chalk.green("🟢=========================================================="));

    return res.json(usuarios);

  } catch (erro) {
    console.error(chalk.bgRed.white(`🚨 Erro ao listar usuários: ${erro.stack || erro}`));
    return res.status(500).json({ 'dados': 'Erro ao listar usuários' });
  }
});




/**
 * @description Inicializa o servidor
 */
app.listen(3000, function (erro) {
    console.log(""); // linha em branco
    console.log("==========================================================");
    if (erro) {
        console.log(`❌ Erro ao iniciar o servidor: ${erro}`);
    } else {
        console.log(`🚀 Servidor rodando com sucesso!`);
        console.log(`🔌 Porta: 3000`);
        console.log(`📡 Metodos: GET /Usuario/:cpf`);
        console.log(`📡 Metodos: GET /UsuarioVerificar/:cpf`);
        console.log(`📡 Metodos: GET /UsuarioVerificarLogin/:login`)
        console.log(`📡 Metodos: POST /Usuario`)
        console.log(`📡 Metodos: POST /Cadastro`)
        console.log(`📡 Metodos: POST /Login`);
        console.log(`📡 Metodos: GET /ListarTodos`);
        console.log(`📡 Metodos: GET /UsuarioVerificarLogin/:login`);


    }
    console.log("==========================================================");
});

