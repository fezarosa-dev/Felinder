package model;

import java.io.Serializable;
import org.json.JSONObject;
import org.json.JSONString;

/**
 * Classe que representa um usuário do sistema.
 * Contém informações pessoais, dados para login e respostas às perguntas.
 * Todas as informações têm validação para garantir dados válidos.
 * 
 * @author Felipe
 */
public class Usuario implements Serializable{
    private String cpf;
    private String senha;
    private String login;
    private String nome;
    private String cep;
    private String rua;
    private String bairro;
    private String cidade;
    private String numero;
    private String r1;
    private String r2;
    private String r3;

    /**
     * Retorna o CPF do usuário.
     * @return CPF como String.
     */
    public String getCpf() {
        return cpf;
    }

    /**
     * Define o CPF do usuário.
     * @param cpf CPF com até 20 caracteres, não pode ser nulo ou vazio.
     * @throws IllegalArgumentException se o CPF for inválido.
     */
    public void setCpf(String cpf) {
        if (cpf == null || cpf.trim().isEmpty() || cpf.length() > 20) {
            throw new IllegalArgumentException("CPF inválido");
        }
        this.cpf = cpf;
    }

    /**
     * Retorna a senha do usuário.
     * @return Senha como String.
     */
    public String getSenha() {
        return senha;
    }

    /**
     * Define a senha do usuário.
     * @param senha Senha com até 20 caracteres, não pode ser nula ou vazia.
     * @throws IllegalArgumentException se a senha for inválida.
     */
    public void setSenha(String senha) {
        if (senha == null || senha.trim().isEmpty() || senha.length() > 20) {
            throw new IllegalArgumentException("Senha inválida");
        }
        this.senha = senha;
    }

    /**
     * Retorna o login do usuário.
     * @return Login como String.
     */
    public String getLogin() {
        return login;
    }

    /**
     * Define o login do usuário.
     * @param login Login com até 50 caracteres, não pode ser nulo ou vazio.
     * @throws IllegalArgumentException se o login for inválido.
     */
    public void setLogin(String login) {
        if (login == null || login.trim().isEmpty() || login.length() > 50) {
            throw new IllegalArgumentException("Login inválido");
        }
        this.login = login;
    }

    /**
     * Retorna o nome completo do usuário.
     * @return Nome como String.
     */
    public String getNome() {
        return nome;
    }

    /**
     * Define o nome completo do usuário.
     * @param nome Nome com até 100 caracteres, não pode ser nulo ou vazio.
     * @throws IllegalArgumentException se o nome for inválido.
     */
    public void setNome(String nome) {
        if (nome == null || nome.trim().isEmpty() || nome.length() > 100) {
            throw new IllegalArgumentException("Nome inválido");
        }
        this.nome = nome;
    }

    /**
     * Retorna o CEP do endereço do usuário.
     * @return CEP como String (ex: 12345-678).
     */
    public String getCep() {
        return cep;
    }

    /**
     * Define o CEP do endereço do usuário.
     * Deve seguir o formato brasileiro (5 números + hífen opcional + 3 números).
     * @param cep CEP válido como String.
     * @throws IllegalArgumentException se o CEP for inválido.
     */
    public void setCep(String cep) {
        if (cep == null || !cep.matches("\\d{5}-?\\d{3}")) {
            throw new IllegalArgumentException("CEP inválido");
        }
        this.cep = cep;
    }

    /**
     * Retorna o nome da rua do endereço.
     * @return Nome da rua como String.
     */
    public String getRua() {
        return rua;
    }

    /**
     * Define o nome da rua do endereço.
     * @param rua Nome da rua com até 50 caracteres, não pode ser nulo ou vazio.
     * @throws IllegalArgumentException se o nome da rua for inválido.
     */
    public void setRua(String rua) {
        if (rua == null || rua.trim().isEmpty() || rua.length() > 50) {
            throw new IllegalArgumentException("Rua inválida");
        }
        this.rua = rua;
    }

    /**
     * Retorna o nome do bairro do endereço.
     * @return Nome do bairro como String.
     */
    public String getBairro() {
        return bairro;
    }

    /**
     * Define o nome do bairro do endereço.
     * @param bairro Nome do bairro com até 50 caracteres, não pode ser nulo ou vazio.
     * @throws IllegalArgumentException se o bairro for inválido.
     */
    public void setBairro(String bairro) {
        if (bairro == null || bairro.trim().isEmpty() || bairro.length() > 50) {
            throw new IllegalArgumentException("Bairro inválido");
        }
        this.bairro = bairro;
    }

    /**
     * Retorna o nome da cidade do endereço.
     * @return Nome da cidade como String.
     */
    public String getCidade() {
        return cidade;
    }

    /**
     * Define o nome da cidade do endereço.
     * @param cidade Nome da cidade com até 50 caracteres, não pode ser nulo ou vazio.
     * @throws IllegalArgumentException se a cidade for inválida.
     */
    public void setCidade(String cidade) {
        if (cidade == null || cidade.trim().isEmpty() || cidade.length() > 50) {
            throw new IllegalArgumentException("Cidade inválida");
        }
        this.cidade = cidade;
    }

    /**
     * Retorna o número da residência.
     * @return Número como String.
     */
    public String getNumero() {
        return numero;
    }

    /**
     * Define o número da residência.
     * @param numero Número com até 5 caracteres, não pode ser nulo ou vazio.
     * @throws IllegalArgumentException se o número for inválido.
     */
    public void setNumero(String numero) {
        if (numero == null || numero.trim().isEmpty() || numero.length() > 5) {
            throw new IllegalArgumentException("Número inválido");
        }
        this.numero = numero;
    }

    /**
     * Retorna a resposta 1.
     * @return Resposta 1 como String (letra 'A', 'B' ou 'C').
     */
    public String getR1() {
        return r1;
    }

    /**
     * Define a resposta 1.
     * Só pode ser a letra 'A', 'B' ou 'C' (maiúsculas).
     * @param r1 Resposta com exatamente 1 caractere ('A', 'B' ou 'C').
     * @throws IllegalArgumentException se a resposta for inválida.
     */
    public void setR1(String r1) {
        if (r1 == null || r1.length() != 1 || !"ABC".contains(r1.toUpperCase())) {
            throw new IllegalArgumentException("Resposta 1 inválida: deve ser 'A', 'B' ou 'C'");
        }
        this.r1 = r1;
    }

    /**
     * Retorna a resposta 2.
     * @return Resposta 2 como String (letra 'A', 'B' ou 'C').
     */
    public String getR2() {
        return r2;
    }

    /**
     * Define a resposta 2.
     * Só pode ser a letra 'A', 'B' ou 'C' (maiúsculas).
     * @param r2 Resposta com exatamente 1 caractere ('A', 'B' ou 'C').
     * @throws IllegalArgumentException se a resposta for inválida.
     */
    public void setR2(String r2) {
        if (r2 == null || r2.length() != 1 || !"ABC".contains(r2.toUpperCase())) {
            throw new IllegalArgumentException("Resposta 2 inválida: deve ser 'A', 'B' ou 'C'");
        }
        this.r2 = r2;
    }

    /**
     * Retorna a resposta 3.
     * @return Resposta 3 como String (letra 'A', 'B' ou 'C').
     */
    public String getR3() {
        return r3;
    }

    /**
     * Define a resposta 3.
     * Só pode ser a letra 'A', 'B' ou 'C' (maiúsculas).
     * @param r3 Resposta com exatamente 1 caractere ('A', 'B' ou 'C').
     * @throws IllegalArgumentException se a resposta for inválida.
     */
    public void setR3(String r3) {
        if (r3 == null || r3.length() != 1 || !"ABC".contains(r3.toUpperCase())) {
            throw new IllegalArgumentException("Resposta 3 inválida: deve ser 'A', 'B' ou 'C'");
        }
        this.r3 = r3;
    }



/**
 * Converte o objeto Usuario para um objeto JSON.
 * @return Objeto JSON representando o usuário.
 */
public JSONObject toJson() {
    JSONObject json = new JSONObject();
    json.put("cpf", this.cpf);
    json.put("senha", this.senha);
    json.put("login", this.login);
    json.put("nome", this.nome);
    json.put("cep", this.cep);
    json.put("rua", this.rua);
    json.put("bairro", this.bairro);
    json.put("cidade", this.cidade);
    json.put("numero", this.numero);
    json.put("r1", this.r1);
    json.put("r2", this.r2);
    json.put("r3", this.r3);
    return json;
}

    public boolean fromJsonLoginString(String json) {
        JSONObject obj = new JSONObject(json);
        this.cpf = obj.getString("cpf");
        this.senha = obj.getString("senha");
        this.login = obj.getString("login");
        this.nome = obj.getString("nome");
        this.cep = obj.getString("cep");
        this.rua = obj.getString("rua");
        this.bairro = obj.getString("bairro");
        this.cidade = obj.getString("cidade");
        this.numero = obj.getString("numero");
        this.r1 = obj.getString("r1");
        this.r2 = obj.getString("r2");
        this.r3 = obj.getString("r3");
        return obj.getBoolean("status");
    }





}
