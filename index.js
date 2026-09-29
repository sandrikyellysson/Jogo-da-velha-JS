// ELEMENTOS DO HTML

const celelementos = document.querySelectorAll("[data-cel]");

const board = document.querySelector("[data-board]");

const mensagemvencedoratexto = document.querySelector(
  ".mensagem-vencedora-texto",
);

const reiniciarBotao = document.querySelector("[data-reiniciar-botao]");

const mensagemvencedora = document.querySelector("[data-mensagem-vencedora]");

// CONTROLE DO JOGADOR

let isCircleTurn;

// COMBINAÇÕES DE VITÓRIA

const combinacoesvitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

// INICIAR JOGO

const startgame = () => {
  // X começa

  isCircleTurn = false;

  // LIMPAR AS CÉLULAS

  for (const cel of celelementos) {
    cel.classList.remove("circle");

    cel.classList.remove("x");

    // Remove evento antigo

    cel.removeEventListener("click", handleClick);

    // Adiciona novo evento

    cel.addEventListener("click", handleClick, { once: true });
  }

  // DEFINE O HOVER

  setBoardHoverClass();

  // ESCONDE A MENSAGEM

  mensagemvencedora.classList.remove("show-mensagem-vencedora");
};

// FINALIZAR JOGO

const endGame = (empate) => {
  if (empate) {
    mensagemvencedoratexto.innerText = "Empate!";
  } else {
    mensagemvencedoratexto.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
  }

  // MOSTRA A MENSAGEM

  mensagemvencedora.classList.add("show-mensagem-vencedora");
};

// VERIFICAR VITÓRIA

const checkWin = (currentPlayer) => {
  return combinacoesvitoria.some((combination) => {
    return combination.every((index) => {
      return celelementos[index].classList.contains(currentPlayer);
    });
  });
};

const checkDraw = () => {
  return [...celelementos].every((cel) => {
    return cel.classList.contains("x") || cel.classList.contains("circle");
  });
};

// MARCAR CÉLULA

const Marcador = (cel, classToAdd) => {
  cel.classList.add(classToAdd);
};

// DEFINIR HOVER DO BOARD

const setBoardHoverClass = () => {
  board.classList.remove("circle");

  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

// TROCAR JOGADOR

const trocarSimbolo = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

// CLIQUE NA CÉLULA

const handleClick = (e) => {
  // PEGAR A CÉLULA CLICADA

  const cel = e.target;

  // DEFINIR O SÍMBOLO

  const classToAdd = isCircleTurn ? "circle" : "x";

  // MARCAR

  Marcador(cel, classToAdd);

  // VERIFICAR VITÓRIA

  const isWin = checkWin(classToAdd);
  // VERIFICAR POR EMPATE
  const isDraw = checkDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // TROCAR JOGADOR
    trocarSimbolo();
  }
};

// INICIAR O JOGO

startgame();

// BOTÃO REINICIAR

reiniciarBotao.addEventListener("click", startgame);
