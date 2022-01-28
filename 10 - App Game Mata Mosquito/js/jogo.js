var altura = window.innerHeight;
var largura = window.innerWidth;
var vidas = 1;
var tempo = 20;
var criaMosquitoTempo = 1500;
// Recebe o parâmetro do nivel após a uma '?'
var nivel = window.location.search.replace("?", "");

if (nivel === "normal") {
  criaMosquitoTempo = 1500;
} else if (nivel === "dificil") {
  criaMosquitoTempo = 1000;
} else if (nivel === "impossible") {
  criaMosquitoTempo = 750;
}

function ajustarTamanhoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
  console.log(largura, altura);
}

var cronometro = setInterval(function () {
  tempo--;
  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criarMosquito);
    window.location.href = "vitoria.html";
  } else {
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);

function posicaoRandomMosquito() {
  // Remover o elemento anterior (Caso exista)
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    if (vidas > 3) {
      window.location.href = "fim-de-jogo.html";
    } else {
      document.getElementById("v" + vidas).src = "images/coracao_vazio.png";
      vidas++;
    }
  }

  var posX = Math.floor(Math.random() * largura) - 90;
  var posY = Math.floor(Math.random() * altura) - 90;

  posX = posX < 0 ? 0 : posX;
  posY = posY < 0 ? 0 : posY;

  console.log(posX, posY);

  // Criando o elemento html
  var mosquito = document.createElement("img");
  mosquito.src = "images/mosquito.png";
  mosquito.className = tamanhoMosquito() + " " + ladoMosquito();
  mosquito.style.left = posX + "px";
  mosquito.style.top = posY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  mosquito.onclick = function () {
    this.remove();
  };

  // Adicionando o elemento criado ao body como elemento filho
  document.body.appendChild(mosquito);
}

function tamanhoMosquito() {
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

function ladoMosquito() {
  var lado = Math.floor(Math.random() * 2);

  switch (lado) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}
