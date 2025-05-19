module.exports = class Usuario {
  // campos privados
  #cpf;
  #senha;
  #login;
  #nome;
  #cep;
  #rua;
  #bairro;
  #cidade;
  #numero;
  #r1;
  #r2;
  #r3;
  #status;

  constructor() {
    // Inicializa tudo como string vazia para evitar undefined
    this.#cpf = "";
    this.#senha = "";
    this.#login = "";
    this.#nome = "";
    this.#cep = "";
    this.#rua = "";
    this.#bairro = "";
    this.#cidade = "";
    this.#numero = "";
    this.#r1 = "";
    this.#r2 = "";
    this.#r3 = "";
    this.#status = false; 
  }

  // Getters e Setters
  get cpf() {
    return this.#cpf;
  }
  set cpf(value) {
    // Você pode adicionar validação aqui, ex: só números, tamanho correto
    this.#cpf = value;
  }

  get senha() {
    return this.#senha;
  }
  set senha(value) {
    // Pode validar força da senha aqui se quiser
    this.#senha = value;
  }

  get login() {
    return this.#login;
  }
  set login(value) {
    this.#login = value;
  }

  get nome() {
    return this.#nome;
  }
  set nome(value) {
    this.#nome = value;
  }

  get cep() {
    return this.#cep;
  }
  set cep(value) {
    this.#cep = value;
  }

  get rua() {
    return this.#rua;
  }
  set rua(value) {
    this.#rua = value;
  }

  get bairro() {
    return this.#bairro;
  }
  set bairro(value) {
    this.#bairro = value;
  }

  get cidade() {
    return this.#cidade;
  }
  set cidade(value) {
    this.#cidade = value;
  }

  get numero() {
    return this.#numero;
  }
  set numero(value) {
    this.#numero = value;
  }

  get r1() {
    return this.#r1;
  }
  set r1(value) {
    this.#r1 = value;
  }

  get r2() {
    return this.#r2;
  }
  set r2(value) {
    this.#r2 = value;
  }

  get r3() {
    return this.#r3;
  }
  set r3(value) {
    this.#r3 = value;
  }
  get status() {
    return this.#status;
  }
  set status(value) {
    this.#status = value;
  }

  // Método para converter o objeto em um registro simples (objeto)
  toRecord() {
    return {
      cpf: this.#cpf,
      senha: this.#senha,
      login: this.#login,
      nome: this.#nome,
      cep: this.#cep,
      rua: this.#rua,
      bairro: this.#bairro,
      cidade: this.#cidade,
      numero: this.#numero,
      r1: this.#r1,
      r2: this.#r2,
      r3: this.#r3,
      status: this.#status
    };
  }
  
  toRecordTodos() {
    return {
      cpf: this.#cpf,
      senha: this.#senha,
      login: this.#login,
      nome: this.#nome,
      cep: this.#cep,
      rua: this.#rua,
      bairro: this.#bairro,
      cidade: this.#cidade,
      numero: this.#numero,
      r1: this.#r1,
      r2: this.#r2,
      r3: this.#r3,
    };
  }
};
