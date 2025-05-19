create table usuario(
cpf varchar(20) primary key,
senha varchar(20),
login varchar(50),
nome varchar(100),
cep varchar(11),
rua varchar(50),
bairro varchar(50),
cidade varchar(50),
numero varchar(5),
constraint ru01 unique(login,senha));



create table resposta(
codigo serial primary key,
cpfuser varchar(20) not null references usuario(cpf),
r1 char(1),
r2 char(1),
r3 char(1));






INSERT INTO usuario (cpf, senha, login, nome, cep, rua, bairro, cidade, numero) VALUES
('11111111111', 'senha01', 'usuario1', 'Lucas Almeida', '01001000', 'Praça da Sé', 'Sé', 'São Paulo', '101'),
('22222222222', 'senha02', 'usuario2', 'Mariana Costa', '20040002', 'Rua das Laranjeiras', 'Laranjeiras', 'Rio de Janeiro', '202'),
('33333333333', 'senha03', 'usuario3', 'Carlos Pereira', '30130010', 'Av. Afonso Pena', 'Centro', 'Belo Horizonte', '303'),
('44444444444', 'senha04', 'usuario4', 'Ana Souza', '40020000', 'Rua da Bahia', 'Pelourinho', 'Salvador', '404'),
('55555555555', 'senha05', 'usuario5', 'Felipe Santos', '50030001', 'Rua da Aurora', 'Boa Vista', 'Recife', '505'),
('66666666666', 'senha06', 'usuario6', 'Beatriz Martins', '60040002', 'Av. Brasil', 'Centro', 'Fortaleza', '606'),
('77777777777', 'senha07', 'usuario7', 'Rafael Lima', '70010003', 'Rua das Flores', 'Centro', 'Brasília', '707'),
('88888888888', 'senha08', 'usuario8', 'Juliana Alves', '80020004', 'Av. Sete de Setembro', 'Centro', 'Curitiba', '808'),
('99999999999', 'senha09', 'usuario9', 'Marcos Oliveira', '90030005', 'Rua XV de Novembro', 'Centro', 'Porto Alegre', '909'),
('12121212121', 'senha10', 'usuario10', 'Patrícia Rodrigues', '01020006', 'Rua da Consolação', 'Consolação', 'São Paulo', '110'),
('13131313131', 'senha11', 'usuario11', 'Eduardo Ferreira', '20030007', 'Rua do Catete', 'Catete', 'Rio de Janeiro', '111'),
('14141414141', 'senha12', 'usuario12', 'Camila Rocha', '30120008', 'Av. Amazonas', 'Centro', 'Belo Horizonte', '112'),
('15151515151', 'senha13', 'usuario13', 'Felipe Costa', '40010009', 'Rua Chile', 'Pelourinho', 'Salvador', '113'),
('16161616161', 'senha14', 'usuario14', 'Aline Barbosa', '50020010', 'Rua do Bom Jesus', 'Boa Vista', 'Recife', '114'),
('17171717171', 'senha15', 'usuario15', 'Thiago Gonçalves', '60030011', 'Av. Beira Mar', 'Meireles', 'Fortaleza', '115'),
('18181818181', 'senha16', 'usuario16', 'Vanessa Nunes', '70040012', 'Rua da Paz', 'Asa Norte', 'Brasília', '116'),
('19191919191', 'senha17', 'usuario17', 'Daniel Souza', '80010013', 'Rua 24 Horas', 'Centro', 'Curitiba', '117'),
('20202020202', 'senha18', 'usuario18', 'Renata Lima', '90020014', 'Av. Borges de Medeiros', 'Centro', 'Porto Alegre', '118'),
('21212121212', 'senha19', 'usuario19', 'Bruno Melo', '01030015', 'Rua Augusta', 'Consolação', 'São Paulo', '119'),
('22222222223', 'senha20', 'usuario20', 'Larissa Fernandes', '20010016', 'Rua da Glória', 'Glória', 'Rio de Janeiro', '120');
