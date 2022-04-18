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

function abrirSala(resposta){  
    mostrarSala();
    carregarMensagem();
    verificarUserOnline(); 
    setInterval(carregarMensagem, 3000);
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
    corporMensagem.scrollIntoView(false);
    corporMensagem.innerHTML = "";
    let conteudoMensagem = "";

    for(let i=0; i<mensagensDoChat.length; i++){
        let tipoMensagem;
        if(mensagensDoChat[i].type === "message"){
            tipoMensagem = "msg-todos";
        }
        if(mensagensDoChat[i].text === "entra na sala..."){
            tipostatus = "msg-sala";
            conteudoMensagem += `<div class=${tipostatus}>
                                                <div class="box-msg">
                                                    <span class="hora-msg">${mensagensDoChat[i].time}</span>
                                                    <span class="entrada-sala"><strong>${mensagensDoChat[i].from}</strong> entra na sala... </span>
                                                </div>
                                          </div>` 
        }
        if(mensagensDoChat[i].text === "sai da sala..."){
            tipostatus = "msg-saida";
            conteudoMensagem += `<div class=${tipostatus}>
                                                <div class="box-saida">
                                                    <span class="hora-msg">${mensagensDoChat[i].time}</span>
                                                    <span class="saida-sala"><strong>${mensagensDoChat[i].from}</strong> Saiu da sala...</span>
                                                </div>
                                 </div>` 
        }
        if(mensagensDoChat[i].type === "private_message"){
            tipoMensagem = "msg-direcionada-alguem";
        }
        if(mensagensDoChat[i].type !== "status"){
            conteudoMensagem += `<div class=${tipoMensagem}>
                                    <div class="box-msg">
                                        <span class="hora-msg">${mensagensDoChat[i].time}</span>
                                        <span class="msg-direcionada-todos"><strong>${mensagensDoChat[i].from}</strong> para <strong>${mensagensDoChat[i].to}</strong>:  ${mensagensDoChat[i].text}</span>
                                    </div>
                                 </div>` 
        } 
        
    }

    corporMensagem.innerHTML = conteudoMensagem;
}

function mandarMensagem(){
    mensagemDoParticipante = document.querySelector(".digite-mensagem").value;
    console.log(mensagemDoParticipante);
    document.querySelector(".digite-mensagem").value = '';

    mensagem = {
        from:nomeUser,
        to:"Todos",
        text:mensagemDoParticipante,
        type:"message"
    }
    let resposta = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    resposta.then(carregarMensagem)
}


function verificarUserOnline(){
    console.log("Verificando....");
    
    setInterval(verificandoStatus,5000);
}
function verificandoStatus(){
   const tempoOnline = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", participante); 
    tempoOnline.then(usuarioOnline);
    tempoOnline.catch(usuarioOffline);
}


function usuarioOnline(resposta){
    console.log(resposta.status);
    if(resposta.status === 200){
        carregarMensagem()  ;
    }
}

function usuarioOffline(error){
    console.log(error.response.status); 
    if(error.response.status === 400){
        alert("Você foi desconectado da sala por inatividade");
        window.location.reload();
    }
   
    
}














