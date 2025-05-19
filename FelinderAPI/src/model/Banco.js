const { Client } = require("pg");
const chalkImport = require("chalk");
const chalk = chalkImport.default ? chalkImport.default : chalkImport;
require("dotenv").config();
console.clear();
const requiredVars = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];
requiredVars.forEach((v) => {
  if (!process.env[v]) {
    throw new Error(`❌ Variável de ambiente ${v} não foi definida no .env`);
  }
});

class Banco {
  static conexao;

  static async init() {
    try {
      this.conexao = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });

      await this.conexao.connect();
      console.clear();
      console.log("");
      console.log(
        chalk.green(
          "=========================================================="
        )
      );
      console.log(chalk.green(`✔  Conexão estabelecida com sucesso!`));
      console.log(chalk.blue(`👉 Host: ${this.conexao.host}`));
      console.log(chalk.blue(`👉 Banco de Dados: ${this.conexao.database}`));
      console.log(chalk.blue(`👉 Usuário: ${this.conexao.user}`));
      console.log(chalk.blue(`👉 Porta: ${this.conexao.port}`));
      console.log(
        chalk.blue(`👉 Senha: ${"*".repeat(this.conexao.password.length)}`)
      );
      console.log(
        chalk.green(
          "=========================================================="
        )
      );
    } catch (erro) {
      console.error(chalk.bgRed(`⚠️ Erro de conexão: ${erro.message}`));
      console.log(
        chalk.bgRed(
          "=========================================================="
        )
      );
    }
  }

  static async close() {
    if (this.conexao) {
      await this.conexao.end();
      console.log(chalk.yellow(`❌  Conexão encerrada com sucesso!`));
      console.log(
        chalk.yellow(
          "=========================================================="
        )
      );
    } else {
      console.log("");
      console.log(chalk.yellow(`⚠️ Nenhuma conexão ativa para encerrar.`));
      console.log(
        chalk.yellow(
          "=========================================================="
        )
      );
    }
  }
}

module.exports = Banco;
