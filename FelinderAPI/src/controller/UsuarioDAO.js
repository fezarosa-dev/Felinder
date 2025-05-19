const Banco = require("../model/Banco");
const Usuario = require("../model/Usuario");
const chalkImport = require("chalk");
const chalk = chalkImport.default ? chalkImport.default : chalkImport;

module.exports = class UsuarioDAO {
async listar(cpf) {
  let obj = null;
  try {
    await Banco.init(); // abre a conexão e mostra log

    console.log(chalk.blue(`🔍 Executando consulta para CPF: ${cpf}`));

    const resultado = await Banco.conexao.query(
      `SELECT 
        u.cpf, u.senha, u.login, u.nome, u.cep, u.rua, u.bairro, u.cidade, u.numero,
        r.r1, r.r2, r.r3
      FROM 
        usuario u
      LEFT JOIN 
        resposta r ON u.cpf = r.cpfuser
      WHERE 
        u.cpf = $1`,
      [cpf]
    );

    console.log(
      chalk.green(
        `✔ Consulta executada com sucesso, linhas encontradas: ${resultado.rowCount}`
      )
    );

    if (resultado.rowCount > 0) {
      const dados = resultado.rows[0];

      obj = new Usuario();
      obj.cpf = dados.cpf;
      obj.senha = dados.senha;
      obj.login = dados.login;
      obj.nome = dados.nome;
      obj.cep = dados.cep;
      obj.rua = dados.rua;
      obj.bairro = dados.bairro;
      obj.cidade = dados.cidade;
      obj.numero = dados.numero;
      obj.r1 = dados.r1;
      obj.r2 = dados.r2;
      obj.r3 = dados.r3;
    }

    await Banco.close(); // fecha conexão e mostra log
    return obj;

  } catch (erro) {
    console.log(chalk.bgRed(`❌ Erro na consulta listar: ${erro.message}`));
    await Banco.close();
  }
}


  async inserir(usuario) {
    try {
      await Banco.init();

      console.log(chalk.blue(`🔍 Inserindo usuário CPF: ${usuario.cpf}`));

      await Banco.conexao.query(
        "INSERT INTO usuario (cpf, senha, login, nome, cep, rua, bairro, cidade, numero) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [
          usuario.cpf,
          usuario.senha,
          usuario.login,
          usuario.nome,
          usuario.cep,
          usuario.rua,
          usuario.bairro,
          usuario.cidade,
          usuario.numero,
        ]
      );

      console.log(chalk.green("✔ Usuário inserido com sucesso!"));

      await Banco.conexao.query(
        "INSERT INTO resposta (cpfuser, r1, r2, r3) VALUES ($1,$2,$3,$4)",
        [usuario.cpf, usuario.r1, usuario.r2, usuario.r3]
      );

      console.log(chalk.green("✔ Respostas inseridas com sucesso!"));

      await Banco.close();
    } catch (erro) {
      console.log(chalk.bgRed(`❌ Erro na inserção: ${erro.message}`));
      await Banco.close();
    }
  }



async login(login, senha) {
  try {
    await Banco.init();

    console.log(chalk.blue(`🔍 Executando consulta para login: ${login}`));
    
    const resultado = await Banco.conexao.query(
      "SELECT * FROM usuario WHERE login = $1 AND senha = $2",
      [login, senha]
    );

    console.log(
      chalk.green(`✔ Consulta executada com sucesso, linhas encontradas: ${resultado.rowCount}`)
    );

    let obj = new Usuario();

    if (resultado.rowCount > 0) {
      const dados = resultado.rows[0];
      obj.cpf = dados.cpf;
      obj.senha = "*********"; // Não exibir a senha
      obj.login = dados.login;
      obj.nome = dados.nome;
      obj.cep = dados.cep;
      obj.rua = dados.rua;
      obj.bairro = dados.bairro;
      obj.cidade = dados.cidade;
      obj.numero = dados.numero;
      obj.status = true;

      // 🔄 Buscar TODAS as respostas do usuário
      const respRespostas = await Banco.conexao.query(
        "SELECT r1, r2, r3 FROM resposta WHERE cpfuser = $1",
        [obj.cpf]
      );

      if (respRespostas.rowCount > 0) {
        // 💡 Vamos pegar a ÚLTIMA resposta cadastrada (a de maior código)
        const ultimaResposta = respRespostas.rows[respRespostas.rowCount - 1];

        obj.r1 = ultimaResposta.r1;
        obj.r2 = ultimaResposta.r2;
        obj.r3 = ultimaResposta.r3;
      } else {
        obj.r1 = null;
        obj.r2 = null;
        obj.r3 = null;
      }
    }

    await Banco.close();
    return obj;

  } catch (erro) {
    console.log(chalk.bgRed(`❌ Erro na consulta login: ${erro.message}`));
    await Banco.close();
  }
}




async UsuarioVerificar(login) {
  let obj = null;

  try {
    await Banco.init(); // 📡 abre conexão e mostra log

    console.log(chalk.blue(`🔍 Executando consulta para LOGIN: ${login}`));

    const resultado = await Banco.conexao.query(
      `SELECT 
        u.cpf, u.senha, u.login, u.nome, u.cep, u.rua, u.bairro, u.cidade, u.numero,
        r.r1, r.r2, r.r3
      FROM 
        usuario u
      LEFT JOIN 
        resposta r ON u.cpf = r.cpfuser
      WHERE 
        u.login = $1`,
      [login]
    );

    console.log(chalk.green(`✔ Consulta executada com sucesso. Linhas encontradas: ${resultado.rowCount}`));

    if (resultado.rowCount > 0) {
      const dados = resultado.rows[0];

      // 🧠 Criação do objeto com os dados retornados
      obj = new Usuario();
      obj.cpf = dados.cpf;
      obj.senha = dados.senha;
      obj.login = dados.login;
      obj.nome = dados.nome;
      obj.cep = dados.cep;
      obj.rua = dados.rua;
      obj.bairro = dados.bairro;
      obj.cidade = dados.cidade;
      obj.numero = dados.numero;
      obj.r1 = dados.r1;
      obj.r2 = dados.r2;
      obj.r3 = dados.r3;
    }

  } catch (erro) {
    console.log(chalk.bgRed.white(`❌ Erro na consulta listarLogin: ${erro.message}`));
  } finally {
    // 🔐 O finally garante que o banco será fechado mesmo com erro
    await Banco.close();
  }

  return obj;
}


async ListarTodos() {
  let lista = [];
  try {
    await Banco.init();

    const resultado = await Banco.conexao.query(`
      SELECT 
        u.cpf, u.senha, u.login, u.nome, u.cep, u.rua, u.bairro, u.cidade, u.numero,
        r.r1, r.r2, r.r3
      FROM usuario u
      LEFT JOIN resposta r ON u.cpf = r.cpfuser
    `);

    if (resultado.rowCount > 0) {
      for (const dados of resultado.rows) {
        const usuario = new Usuario();

        // Preenche os dados usando os setters
        usuario.cpf = dados.cpf;
        usuario.senha = dados.senha;
        usuario.login = dados.login;
        usuario.nome = dados.nome;
        usuario.cep = dados.cep;
        usuario.rua = dados.rua;
        usuario.bairro = dados.bairro;
        usuario.cidade = dados.cidade;
        usuario.numero = dados.numero;
        usuario.r1 = dados.r1;
        usuario.r2 = dados.r2;
        usuario.r3 = dados.r3;

        lista.push(usuario.toRecordTodos()); // adiciona o objeto simples (sem campos privados)
      }
    }
  } catch (erro) {
    console.log(chalk.bgRed.white(`❌ Erro na consulta listarTodos: ${erro.message}`));
  } finally {
    await Banco.close();
  }
  return lista; // retorna array de objetos simples, JSON já mostra certinho
}





};
