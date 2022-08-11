// splash screen
document.querySelector(".controlBtns button").onclick = function () {
  document.querySelector(".controlBtns").remove();
};

let triesElement = document.querySelector(".tries span");

let newGame = document.querySelector(".newGameButton");

let restartGame = document.querySelectorAll(".gameBlock");
console.log(restartGame);

newGame.addEventListener("click", function () {
  //   restartGame.classList.add("restart");
  //   restartGame.classList.remove("hasMatched");

  blocks.forEach((block) => {
    block.classList.remove("show");
    block.classList.remove("hasMatched");
  });
  triesElement.innerHTML = 0;
});

let duration = 1000;

let blocksContainer = document.querySelector(".memoryGameBlocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  console.log(block, index);
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip Block

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("show");

  let allFlippedBlocks = blocks.filter((flipBlock) =>
    flipBlock.classList.contains("show")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatcedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Block Match

function checkMatcedBlock(firstBlock, secondBlock) {
  if (firstBlock.dataset.character === secondBlock.dataset.character) {
    firstBlock.classList.remove("show");
    secondBlock.classList.remove("show");
    firstBlock.classList.add("hasMatched");
    secondBlock.classList.add("hasMatched");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("show");
      secondBlock.classList.remove("show");
    }, duration);
  }
}

// Stop Clicking

function stopClicking() {
  blocksContainer.classList.add("noClicking");

  setTimeout(() => {
    blocksContainer.classList.remove("noClicking");
  }, duration);
}
// Shuffle Function

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
