const http = require("http");
const fs = require("fs");
var url = require('url');

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","*");

    if (req.url.startsWith('/signup')){
        if(req.method === 'POST') {
            console.log(req.method);
            let body = '';
            req.on('data', buffer => {
                body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
            });
            req.on('end', async () => {
                const users = await carregaUsers()
                input = JSON.parse(body)
                if(verificaUserEmail(input.email,users)){
                    res.writeHead(401, { "Content-Type": "text/plain" });
                    res.end(JSON.stringify({
                            success: false,
                            message: "Email já em uso."
                    }));
                }
                else {
                    if(await criaNovoUser(input,users)){
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(JSON.stringify({
                            success: true,
                            message: "Conta criada com sucesso!"
                        }));
                    }
                    else {
                        res.writeHead(401, { "Content-Type": "text/plain" });
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
                    input = JSON.parse(body)
                    if(fazerLogin(input,users)){
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(JSON.stringify({
                            success: true,
                            message: "Login aprovado"
                        }));
                    }
                    else {
                        res.writeHead(401, { "Content-Type": "text/plain" });
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
            res.writeHead(200, { "Content-Type": "text/plain" });
            console.log(req.method);
            let body = '';
            req.on('data', buffer => {
                body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
            });
            req.on('end', async () => {
                /* let idAutomatico =  gerarId(vetorClientes); 
                const novoCliente = {...JSON.parse(body), id:idAutomatico, contaConjunta:{} , metas: [], gastos: [], entradas: [], investimentos: [], saldo: 0};
                if(verificaClienteEmail(novoCliente.email,vetorClientes) == null) {
                    vetorClientes.cliente.push(novoCliente);
                    atualizarArquivo(vetorClientes);
                    res.end(JSON.stringify(novoCliente)); 
                }
                else res.end("Já existe outra conta com este email"); */
            });
        }
        else if (req.method === 'GET') {  
            res.writeHead(200, { "Content-Type": "text/plain" });
            let parametros = url.parse(req.url, true).query;
            if(!parametros.id) {
                console.log("GET ALL");
                //res.end(JSON.stringify(/* PRODUTOS */, null, "\t"));
            }
            else {
                console.log("GET id:" + parametros.id)
                /* const indiceCliente = verificaClienteId(parametros.id, vetorClientes);
                if(indiceCliente != null) {
                    res.end(JSON.stringify(vetorClientes.cliente[indiceCliente], null, "\t"));
                }
                else res.end("Usuário não encontrado"); */
            }
        }
        else if (req.method === 'PUT') {
            res.writeHead(200, { "Content-Type": "text/plain" });
            let body = '';
            req.on('data', buffer => {
                body += buffer.toString();
            });
            req.on('end', async () => {
                /* const clienteAlterado = JSON.parse(body);

                console.log("PUT id:" + clienteAlterado.id);

                if (clienteAlterado.id == null) {
                    return res.end("id não foi informado");
                }

                let indiceCliente = verificaClienteId(clienteAlterado.id, vetorClientes);

                if (indiceCliente == null) {
                    return res.end("Cliente não encontrado");
                }

                const cliente = vetorClientes.cliente[indiceCliente];

                if (
                    clienteAlterado.email !== cliente.email &&
                    verificaClienteEmail(clienteAlterado.email, vetorClientes) != null
                ) {
                    return res.end(JSON.stringify(cliente));
                }

                const campos = [
                    "nome",
                    "email",
                    "pw_hash",
                    "metas",
                    "gastos",
                    "entradas",
                    "investimentos",
                    "saldo",
                    "contaConjunta"
                ];

                campos.forEach(campo => {
                    const valor = clienteAlterado[campo];

                    if (valor != null && valor !== "") {
                        cliente[campo] = valor;
                    }
                });

                atualizarArquivo(vetorClientes);

                res.end(JSON.stringify(cliente)); */
            });
        }
        else if (req.method === 'DELETE') {
            res.writeHead(200, { "Content-Type": "text/plain" });
            var parametros = url.parse(req.url, true).query;
            console.log("DELETE id:" + parametros.id);
           /*  let indiceCliente = verificaClienteId(parametros.id, vetorClientes);
            if(indiceCliente != null) {
                const clienteDeletado = vetorClientes.cliente.splice(indiceCliente,1);
                atualizarArquivo(vetorClientes);
                res.end(JSON.stringify(clienteDeletado, null, "\t"));
            } else {
                res.end("Cliente não encontrado")
            } */
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

/* 
function verificaClienteId(id, vetorClientes) {
    for(let i = 0; i < vetorClientes.cliente.length; i++) {
        if(id == vetorClientes.cliente[i].id) {
            return i;
        }
    }
    return null;
}

function gerarId(vetorClientes) {
    let valido;
    let i;
    if(vetorClientes.cliente.length == 0) {
        return 0;
    }
    else {
        for(i = 0; i <= vetorClientes.cliente.length; i++) {
            valido = true;
            for(let j = 0; j < vetorClientes.cliente.length; j++) {
                if(i == vetorClientes.cliente[j].id) {
                    valido = false;
                }
            }
            if(valido) {
                return i;
            }
        }
    }
}
 */



async function carregaProdutos() {
    return new Promise((resolve,reject) => {
        fs.readFile('.src/json/produtos.json', "utf8", (error, data) => {
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
        fs.writeFile('./src/json/produtos.json', JSON.stringify(vetorProdutos, null, "\t"), "utf8", err => {
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
        fs.readFile('./src/json/users.json', "utf8", (error, data) => {
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
        fs.writeFile('./src/json/users.json', JSON.stringify(vetorUsers, null, "\t"), "utf8", err => {
            if (err) {
              reject("Erro ao atualizar o arquivo de users");
            } else {
              resolve("Arquivo de users atualizado com sucesso")
            }
        });
    })
}

function verificaUserEmail(email, vetorUsers) {
    for(let i = 0; i < vetorUsers.length; i++) {
        if(email == vetorUsers[i].email) {
            return i;
        }
    }
    return false;
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

function fazerLogin(input,users){
    let i = verificaUserEmail(input.email, users)
    if(i){
        if(input.senha === users[i].senha){
            return true;
        }
        else return false;
    }
    else return false;
}