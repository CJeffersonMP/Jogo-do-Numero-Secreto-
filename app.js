let listaDeNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,"Brazilian Portuguese Female",{rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto.");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroLimite}`);    
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1" , "Acertou!!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Parebéns, com ${tentativas} ${palavraTentativa} você conseguiu.`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O numero secreto é menor!");
        } else {
            exibirTextoNaTela("p", "O numero secreto é maior!");
        }
        tentativas++;
        limpaCampo();
    }    
}

function limpaCampo() {
    chute = document.querySelector("input");
    chute.value = " ";
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

