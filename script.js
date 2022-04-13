function mandarMensagem(){
    alert("mandei msg")
    const corporMensagem = document.querySelector(".corpo-mensagem");
    let msgUser = document.querySelector(".digite-mensagem").value;
    corporMensagem.innerHTML += `     <div class="msg-sala">
                                            <div class="box-msg">
                                                <span class="hora-msg">(09:21:45)</span>
                                                <span class="entrada-sala"><strong>João</strong> ${msgUser} </span>
                                            </div>
                                      </div>`
}