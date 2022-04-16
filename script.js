let nomeUser;
let participante;
let mensagensDoChat;
let mensagemDoParticipante;


function entrarNaSala(){
    nomeUser = document.querySelector(".digitar-nome").value;
    participante = { 
        name: nomeUser,
    }

   const telaEntrada = document.querySelector(".nome-user");
   telaEntrada.classList.add("ocultar-pg-msg");

    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", participante);
 
    requisicao.then(abrirSala);
    requisicao.catch(erroNomeUsado);
}

function erroNomeUsado(error){
    if(error.response.status === 400){
        alert("Esse nome já está em uso, use outro nome!");
        window.location.reload();
    }
}

function abrirSala(){
    mostrarSala();
    carregarMensagem();
    mandarMensagem();
    setInterval(carregarMensagem, 5000);
}

function mostrarSala(){
    const topo = document.querySelector(".topo");
    topo.classList.remove("ocultar-pg-msg");

    const corpoMensagem =  document.querySelector(".corpo-mensagem");
    corpoMensagem.classList.remove("ocultar-pg-msg");

    const rodaPe = document.querySelector(".roda-pe"); 
    rodaPe.classList.remove("ocultar-pg-msg");
}

function carregarMensagem(){
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    console.log(mensagens);
    mensagens.then(listarMensagens);
}

function listarMensagens(resposta){
    mensagensDoChat = resposta.data;

    const corporMensagem = document.querySelector(".corpo-mensagem");

    corporMensagem.innerHTML = "";
    let conteudoMensagem = "";

    for(let i=0; i<mensagensDoChat.length; i++){
        conteudoMensagem += `<div class="msg-todos">
                                        <div class="box-msg">
                                            <span class="hora-msg">${mensagensDoChat[i].time}</span>
                                            <span class="msg-direcionada-todos"><strong>${mensagensDoChat[i].from}</strong> para <strong>${mensagensDoChat[i].to}</strong>:  ${mensagensDoChat[i].text}</span>
                                        </div>
                                    </div>`
    }

      corporMensagem.innerHTML = conteudoMensagem;
}

function mandarMensagem(){
    mensagemDoParticipante = document.querySelector(".digite-mensagem").value;

    mensagem = {
        from:participante,
        to:"Todos",
        text:mensagemDoParticipante,
        type:"message"
    }
    let resposta = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    resposta.then(renderizarMensagem)    
}

function renderizarMensagem(){
    carregarMensagem()
}













