let nomeUser ;
let nomeOjeto;
let conteudosMsg = [{
    from: nomeUser,
    to: "Todos",
    text: "entra na sala...",
    type: "status",
    time: "08:01:17"
}]
function entrarNaSala(){
    nomeUser = document.querySelector(".digitar-nome").value;
    nomeOjeto = { 
        name: nomeUser,
    }

   const telaEntrada = document.querySelector(".nome-user");
   telaEntrada.classList.add("ocultar-pg-msg");

 
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ",nomeOjeto);


    requisicao.then(abrirSala);
    requisicao.catch(erroNomeUsado);
    aparecerMensagem()
}
function erroNomeUsado(error){
    while(error.response.status === 400){
        prompt("Esse nome já está em uso, use outro nome!");
        if(error.response.status === 200){
            mandarMensagem()
        }
    }

}

function abrirSala(){
    console.log(nomeOjeto);
    const corporMensagem = document.querySelector(".corpo-mensagem");
    corporMensagem.innerHTML += `    <div class="msg-sala">
                                         <div class="box-msg">
                                             <span class="hora-msg">${conteudosMsg[0].time}</span>
                                             <span class="entrada-sala"><strong>${nomeOjeto.name}</strong> entrou na sala... </span>
                                         </div>
                                     </div>`
}


function aparecerMensagem(){
    const topo = document.querySelector(".topo");
    topo.classList.remove("ocultar-pg-msg");

    const corpoMensagem =  document.querySelector(".corpo-mensagem");
    corpoMensagem.classList.remove("ocultar-pg-msg");

    const rodaPe = document.querySelector(".roda-pe"); 
    rodaPe.classList.remove("ocultar-pg-msg");
}

function mandarMensagem(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(function(){
        const corporMensagem = document.querySelector(".corpo-mensagem");
        let msgUser = document.querySelector(".digite-mensagem").value;
       
        corporMensagem.innerHTML += `     <div class="msg-sala">
                                                <div class="box-msg">
                                                    <span class="hora-msg">${conteudosMsg[0].time}</span>
                                                    <span class="entrada-sala"><strong>${nomeOjeto.name}</strong> ${msgUser} </span>
                                                </div>
                                          </div>`                     
        corporMensagem.scrollIntoView();
        //verificarUserOnline()
      //setInterval(location.reload(),3000);  
    })
 
}

/*function verificarUserOnline(){
    console.log("Verificando....");
    
    let tempoResposta =  setInterval(function(){
        let tempoOnline = axios.post("https://mock-api.driven.com.br/api/v6/uol/status"),nomeOjeto; 
    },5000);

    if(tempoResposta > 5000){
        const corporMensagem = document.querySelector(".corpo-mensagem");
        corporMensagem.innerHTML +=`<div class="msg-sala">
                                        <div class="box-msg">
                                            <span class="hora-msg">(09:21:45)</span>
                                            <span class="saida-sala"><strong>${nomeOjeto.name}</strong> Saiu da sala... </span>
                                        </div>
                                    </div>`

    }
}*/


// msgUser.style.cssText = "font-family: 'Roboto', sans-serif;"