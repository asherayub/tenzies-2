import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const Tenzies = () => {
  const [difficulty, setDifficulty] = useState({
    noOfBlocks: 10,
    lengthOfNumbers: 6,
  });
  const [boxes, setBoxes] = useState(generateRandomNumbersArray);
  const [isWinner, setIsWinner] = useState(false);
  const [startGame, setStartGame] = useState(true);
  function handleDifficultyChange(e) {
    const { name, value } = e.target;
    if (value < 21 && value > 0)
      setDifficulty((prev) => ({ ...prev, [name]: Number(value) }));
  }
  function generateRandomNumbersArray() {
    const randomNumbersArr = [];
    for (let i = 0; i < difficulty.noOfBlocks; i++) {
      randomNumbersArr.push({
        id: nanoid(),
        value: Math.floor(Math.random() * difficulty.lengthOfNumbers + 1),
        freeze: false,
      });
    }
    return randomNumbersArr;
  }

  function generateBoxes() {
    if (isWinner) {
      setBoxes(generateRandomNumbersArray);
      setIsWinner(false);
    } else {
      setBoxes((prev) => {
        return prev.map((box) => {
          return box.freeze
            ? box
            : {
                id: nanoid(),
                value: Math.floor(
                  Math.random() * difficulty.lengthOfNumbers + 1
                ),
                freeze: false,
              };
        });
      });
    }
  }
  function freezeBox(id) {
    setBoxes((prev) => {
      return prev.map((box) => {
        return box.id === id ? { ...box, freeze: !box.freeze } : box;
      });
    });
  }

  function checkMaxInput(e) {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  }

  useEffect(() => {
    const allValues = boxes.map((box) => box.value);
    const allFrozen = boxes.map((box) => box.freeze);
    if (
      allValues.every((n) => n === boxes[0].value) &&
      allFrozen.every((n) => n === true)
    )
      setIsWinner(true);
  }, [boxes]);
  useEffect(() => {
    setBoxes(generateRandomNumbersArray);
  }, [difficulty]);
  // ! this didn't work. Goal was to make it pressing
  // ! SPACE BAR generates new boxes.
  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.code === "Space") generateBoxes();
  //   });
  //   return () => {
  //     window.removeEventListener("keydown", (e) => {
  //       if (e.code === "Space") generateBoxes();
  //     });
  //   };
  // });
  return (
    <div className="wrapper">
      {startGame ? (
        <div className="start">
          <h1 className="intro">Welcome to the Game</h1>

          <button onClick={() => setStartGame((prev) => !prev)}>Start</button>
        </div>
      ) : (
        <div className="main">
          <div className="github">
            <a href="https://www.github.com/asherayub" target="_blank">
              GitHub
            </a>
          </div>
          <div className="inputs">
            <label htmlFor="noOfBlocks">
              Number of Blocks <small>(max: 20)</small>
            </label>
            <input
              type="number"
              id="noOfBlocks"
              value={difficulty.noOfBlocks}
              name="noOfBlocks"
              onChange={handleDifficultyChange}
              maxLength={2}
              onInput={checkMaxInput}
            />
            <label htmlFor="lengthOfNumbers">
              Length of numbers <small>(max: 20)</small>
            </label>
            <input
              type="number"
              id="lengthOfNumbers"
              value={difficulty.lengthOfNumbers}
              name="lengthOfNumbers"
              onChange={handleDifficultyChange}
              maxLength={2}
              onInput={checkMaxInput}
            />
          </div>
          <div className="boxes">
            {boxes &&
              boxes.map((box) => (
                <span
                  className={`box ${box.freeze ? "freeze" : ""}`}
                  key={box.id}
                  onClick={() => freezeBox(box.id)}
                >
                  {box.value}
                </span>
              ))}
            <button onClick={generateBoxes}>
              {isWinner ? "Reset Game" : "Generate"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenzies;
