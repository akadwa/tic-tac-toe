const game = (() => {
  let running = true;
  let options = ["", "", "", "", "", "", "", "", ""];
  let roundWon = false;
  let winner = "";

  const DOMselector = (() => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.querySelector('.play-again-button');
    const resultDisplay = document.querySelector(".current-result-text");

    return { cells, restartButton, resultDisplay };
  })();

  const player = (playerMarker, goesFirst) => {
    let isTurn = goesFirst;
    const marker = playerMarker;

    const setMarker = (element) => {
      element.innerHTML = marker;
    }

    return { isTurn, marker, setMarker };
  };

  const player1 = player('X', true);
  const player2 = player('O', false);

  const placeMarker = (cell, cellIndex) => {
    if (cell.innerHTML === '' && player1.isTurn === true && running === true) {
      player1.setMarker(cell);
      updateOptions(cellIndex, player1);
      toggleTurns();
    } else if (cell.innerHTML === '' && player2.isTurn === true && running === true) {
      player2.setMarker(cell);
      updateOptions(cellIndex, player2);
      toggleTurns();
    }
  };

  const toggleTurns = () => {
    if (player1.isTurn === true) {
      player1.isTurn = false;
      player2.isTurn = true;
    } else {
      player2.isTurn = false;
      player1.isTurn = true;
    }
  };

  const updateOptions = (indexOfCell, player) => {
    options[indexOfCell] = player.marker;
  };

  const displayTurn = () => {
    if (player1.isTurn) {
      DOMselector.resultDisplay.innerHTML = `${player1.marker}'s turn`;
    } else if (player2.isTurn) {
      DOMselector.resultDisplay.innerHTML = `${player2.marker}'s turn`;
    }
  };

  displayTurn();


  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winConditions.forEach(winCondition => {
      let firstCell = options[winCondition[0]];
      let secondCell = options[winCondition[1]];
      let thirdCell = options[winCondition[2]];

      if (firstCell == secondCell && secondCell == thirdCell && firstCell != '' && secondCell != '' && thirdCell != '') {
        roundWon = true;
        winner = firstCell;
      }
    })

    if (roundWon) {
      DOMselector.resultDisplay.innerHTML = `${winner} wins!`;
      running = false;
    } else if (!options.includes("")) {
      DOMselector.resultDisplay.innerHTML = `Draw!`;
      running = false;
    }
  };

  const restartGame = () => {
    running = true;
    options = ["", "", "", "", "", "", "", "", ""];
    player1.isTurn = true;
    player2.isTurn = false;
    roundWon = false;
    winner = "";

    DOMselector.resultDisplay.innerHTML = `&nbsp;`;

    DOMselector.cells.forEach(cell => {
      cell.innerHTML = '';
    })

    DOMselector.resultDisplay.innerHTML = `X's turn`;
  };

  DOMselector.cells.forEach(cell => {
    cell.addEventListener('click', () => {
      cellIndex = cell.getAttribute("cell-index");
      placeMarker(cell, cellIndex);
      displayTurn();
      checkWinner();
    }
    )
  });

  DOMselector.restartButton.addEventListener('click', restartGame);
})();
