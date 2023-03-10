import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const calculatorButtons = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const formatNumber = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

const App = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const handleNumberClick = (value) => {
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? formatNumber(Number(removeSpaces(calc.num + value)))
            : formatNumber(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const handleCommaClick = (value) => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const handleSignClick = (value) => {
    setCalc({
      ...calc,
      sign: value,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : formatNumber(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const handleEqualsClick = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Cannot divide by zero"
            : formatNumber(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const handleInvertClick = () => {
    setCalc({
      ...calc,
      num: calc.num ? formatNumber(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? formatNumber(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const handlePercentClick = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const handleResetClick = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {calculatorButtons.flat().map((btn, i) => (
          <Button
            key={i}
            className={btn === "=" ? "equals" : ""}
            value={btn}
            onClick={
              btn === "C"
                ? handleResetClick
                : btn === "+-"
                ? handleInvertClick
                : btn === "%"
                ? handlePercentClick
                : btn === "="
                ? handleEqualsClick
                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                ? () => handleSignClick(btn)
                : btn === "."
                ? () => handleCommaClick(btn)
                : () => handleNumberClick(btn)
            }
          />
        ))}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
