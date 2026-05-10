const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require('url');

const usersFilePath = path.join(__dirname, "..", "json", "users.json");
const produtosFilePath = path.join(__dirname, "..", "json", "produtos.json");

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","*");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url.startsWith('/signup')){
        if(req.method === 'POST') {
            console.log(req.method);
            let body = '';
            req.on('data', buffer => {
                body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
            });
            req.on('end', async () => {
                const users = await carregaUsers()
                const input = {
                        ...JSON.parse(body),
                        id: gerarId(users)
                }
                if(verificaUserEmail(input.email,users) !== -1){
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                            success: false,
                            message: "Email já em uso."
                    }));
                }
                else {
                    if(await criaNovoUser(input,users)){
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: true,
                            message: "Conta criada com sucesso!"
                        }));
                    }
                    else {
                        res.writeHead(401, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                                success: false,
                                message: "Erro ao acessar arquivo json."
                        }));
                    }
                }
            })
        }
    }

    else if (req.url.startsWith('/login')){
        if(req.method === 'POST') {
            console.log(req.method);
            let body = '';
            req.on('data', buffer => {
                body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
            });
            req.on('end', async () => {
                try {
                    const users = await carregaUsers()
                    const input = JSON.parse(body)
                    if(fazerLogin(input,users)){
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: true,
                            message: "Login aprovado"
                        }));
                    }
                    else {
                        res.writeHead(401, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: false,
                            message: "Email ou senha inválidos"
                        }));
                    }
                }
                catch (err) {
                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: "Erro interno no servidor"
                    }));
                }
            })
        }
    }

    else if (req.url.startsWith('/produtos')){
        if(req.method === 'POST') {
            console.log(req.method);
            let body = '';
            req.on('data', buffer => {
                body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
            });
            req.on('end', async () => {
                try {
                    const produtos = await carregaProdutos()
                    const input = {
                        ...JSON.parse(body),
                        id: gerarId(produtos)
                    }
                    if(criaNovoProduto(input,produtos)){
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(JSON.stringify({
                            success: true,
                            message: "Produto criado!"
                        }));
                    }
                    else {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(JSON.stringify({
                                success: true,
                                message: "Erro ao criar produto."
                        }))
                    };
                }
                catch (err) {
                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: "Erro interno no servidor"
                    }));
                }
            });
        }
        else if (req.method === 'GET') {  
            res.writeHead(200, { "Content-Type": "text/plain" });
            let parametros = Object.fromEntries(
                new URL(req.url, `http://${req.headers.host}`).searchParams
            );
            const vetorProdutos = await carregaProdutos()
            if(!parametros.id) {
                console.log("GET ALL");
                res.end(JSON.stringify(vetorProdutos, null, "\t"));
            }
            else {
                console.log("GET id:" + parametros.id)
                const indiceProduto = verificaProdutoId(parametros.id, vetorProdutos);
                if(indiceProduto != null) {
                    res.end(JSON.stringify(vetorProdutos[indiceProduto], null, "\t"));
                }
                else res.end("Produto não encontrado"); 
            }
        }
        else if (req.method === 'PUT') {
            res.writeHead(200, { "Content-Type": "text/plain" });
            let body = '';
            req.on('data', buffer => {
                body += buffer.toString();
            });
            req.on('end', async () => {
                let parametros = Object.fromEntries(
                    new URL(req.url, `http://${req.headers.host}`).searchParams
                );  
                const produtoAlterado = JSON.parse(body);
                
                console.log("PUT id:" + parametros.id);
                
                if (parametros.id == null) {
                    return res.end("id não foi informado");
                }
                
                const vetorProdutos = await carregaProdutos()
                let indiceProduto = verificaProdutoId(parametros.id, vetorProdutos);

                if (indiceProduto == null) {
                    return res.end("Cliente não encontrado");
                }
                
                const produtoAntigo = vetorProdutos[indiceProduto];

                vetorProdutos[indiceProduto] = {
                    ...produtoAlterado,
                    id: vetorProdutos[indiceProduto].id
                }
                
                await atualizarProdutos(vetorProdutos);

                res.end(JSON.stringify(produtoAntigo));
                
            });
        }
        else if (req.method === 'DELETE') {
            res.writeHead(200, { "Content-Type": "text/plain" });
            const vetorProdutos = await carregaProdutos()
            let parametros = Object.fromEntries(
                new URL(req.url, `http://${req.headers.host}`).searchParams
            );
            console.log("DELETE id:" + parametros.id);
            let indiceProduto = verificaProdutoId(parametros.id, vetorProdutos);
            if(indiceProduto != null) {
                const produtoDeletado = vetorProdutos.splice(indiceProduto,1);
                await atualizarProdutos(vetorProdutos);
                res.end(JSON.stringify(produtoDeletado, null, "\t"));
            } else {
                res.end("Produto não encontrado")
            } 
        }
    }
    else {
        console.log("Erro 404")
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page not found");
    } 
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})


function verificaProdutoId(id, vetorProdutos) {
    for(let i = 0; i < vetorProdutos.length; i++) {
        if(id == vetorProdutos[i].id) {
            return i;
        }
    }
    return null;
}

function gerarId(vetorProdutos) {
    let valido;
    let i;
    if(vetorProdutos.length == 0) {
        return 0;
    }
    else {
        for(i = 0; i <= vetorProdutos.length; i++) {
            valido = true;
            for(let j = 0; j < vetorProdutos.length; j++) {
                if(i == vetorProdutos[j].id) {
                    valido = false;
                }
            }
            if(valido) {
                return i;
            }
        }
    }
}

async function carregaProdutos() {
    return new Promise((resolve,reject) => {
        fs.readFile(produtosFilePath, "utf8", (error, data) => {
            if (error) {
              reject(error);
            }
            const objProdutos = JSON.parse(data);
            if (Array.isArray(objProdutos)) {
                resolve(objProdutos);
            }
            else resolve([]);
        });
    })
}

async function atualizarProdutos(vetorProdutos) {
    return new Promise((resolve,reject) => {
        fs.writeFile(produtosFilePath, JSON.stringify(vetorProdutos, null, "\t"), "utf8", err => {
            if (err) {
              console.error("Erro ao atualizar o arquivo de produtos");
            } else {
              console.log("Arquivo de produtos atualizado com sucesso")
            }
        });
    })
}

async function carregaUsers() {
    return new Promise((resolve,reject) => {
        fs.readFile(usersFilePath, "utf8", (error, data) => {
            if (error) {
              reject(error);
            }
            const objUsers = JSON.parse(data);
            if (Array.isArray(objUsers)) {
                resolve(objUsers);
            }
            else resolve([]);
        });
    })
}

async function atualizarUsers(vetorUsers) {
    return new Promise((resolve,reject) => {
        fs.writeFile(usersFilePath, JSON.stringify(vetorUsers, null, "\t"), "utf8", err => {
            if (err) {
              reject("Erro ao atualizar o arquivo de users");
            } else {
              resolve("Arquivo de users atualizado com sucesso")
            }
        });
    })
}

async function criaNovoUser(novoUser,vetorUsers){
    vetorUsers.push(novoUser)
    return atualizarUsers(vetorUsers)
        .then(()=>{
            return true
        })
        .catch(err=>{
            console.log(err);
            return false;
        });
}

async function criaNovoProduto(novoProduto,vetorProdutos){
    vetorProdutos.push(novoProduto)
    return atualizarProdutos(vetorProdutos)
        .then(()=>{
            return true
        })
        .catch(err=>{
            console.log(err);
            return false;
        });
}

function fazerLogin(input,users){
    let i = verificaUserEmail(input.email, users)
    if(i !== -1){
        if(String(input.senha) === String(users[i].senha)){
            return true;
        }
        else return false;
    }
    else return false;
}

function verificaUserEmail(email, vetorUsers) {
    for(let i = 0; i < vetorUsers.length; i++) {
        if(email == vetorUsers[i].email) {
            return i;
        }
    }
    return -1;
}