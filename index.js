import express from 'express';
import path from 'path';

const host = '0.0.0.0';
const porta = 3000;
let listaUsuarios = [];

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(process.cwd(), 'publico')));

function cadastrarUsuario(requisicao, resposta) {
    const nome = requisicao.body.nome;
    const sobrenome = requisicao.body.sobrenome;
    const usuario = requisicao.body.usuario;
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const cep = requisicao.body.cep;

    if (!nome || nome.trim() === "") {
        resposta.write(`
        </div>
        <div class="container alert alert-danger" role="alert">
            Por favor informe o nome do usuário.
        </div>`);
    }

    if (!sobrenome || sobrenome.trim() === "") {
        resposta.write(`
        <div class="alert alert-danger" role="alert">
            Por favor informe o sobrenome do usuário.
        </div>`);
    }

    if (!usuario || usuario.trim() === "") {
        resposta.write(`
        <div class="alert alert-danger" role="alert">
            Por favor informe o nome de login do usuário.
        </div>`);
    }

    if (!cidade || cidade.trim() === "") {
        resposta.write(`
        <div class="alert alert-danger" role="alert">
            Por favor informe a cidade.
        </div>`);
    }

    if (!estado || estado.trim() === "") {
        resposta.write(`
        <div class="alert alert-danger" role="alert">
            Por favor informe o estado.
        </div>`);
    }

    if (!cep || cep.trim() === "") {
        resposta.write(`
        <div class="alert alert-danger" role="alert">
            Por favor informe o cep.
        </div>`);
    }

    if (nome && sobrenome && usuario && cidade && estado && cep) {
        listaUsuarios.push({
            nome: nome,
            sobrenome: sobrenome,
            usuario: usuario,
            cidade: cidade,
            estado: estado,
            cep: cep
        });
    }

    resposta.write(`<!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Página de Cadastro Usuários</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <style>
            .container {
                border: 2px solid rgb(173, 208, 196);
                border-radius: 25px;
                background-color: rgb(173, 208, 196);
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            }

            .btn-primary {
                background-color: green;
                border: green;
            }
        </style>
    </head>

    <body>
        <div class="container border mt-5">
            <form method="POST" action='/cadastrarUsuario' class="row g-3">
                <legend style="text-align: center; margin-top: 30px;">Cadastro de Usuários</legend>
                <div class="col-md-4">
                    <label for="nome" class="form-label">Nome:</label>
                    <input type="text" class="form-control" id="nome" name="nome" required>
                </div>
                <div class="col-md-4">
                    <label for="sobrenome" class="form-label">Sobrenome:</label>
                    <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
                </div>
                <div class="col-md-4">
                    <label for="usuario" class="form-label">Nome do usuário:</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" class="form-control" id="usuario" name="usuario"
                            aria-describedby="inputGroupPrepend" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="cidade" class="form-label">Cidade:</label>
                    <input type="text" class="form-control" id="cidade" name="cidade" required>
                </div>
                <div class="col-md-3">
                    <label for="estado" class="form-label">UF:</label>
                    <select class="form-select" id="estado" name="estado" required>
                        <option selected disabled value="">Escolha um estado</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="cep" class="form-label">CEP</label>
                    <input type="text" class="form-control" id="cep" name="cep" required>
                </div>
                <div class="col-12 mb-3">
                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </div>
            </form>
        </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    </html>
    `);

    resposta.end();
}


app.post('/cadastrarUsuario', cadastrarUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})