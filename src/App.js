import { useState } from "react";
import Screen from "./Screen";
import Button from "./Button";
import { Wrapper, ButtonBox } from "./styles";

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

  const handleNumberClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    const num = removeSpaces(calc.num);
    if (num.length < 16) {
      setCalc({
        ...calc,
        num:
          num % 1 === 0 && !calc.num.toString().includes(".")
            ? formatNumber(Number(num + value))
            : formatNumber(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const handleCommaClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const handleSignClick = (e) => {
    const sign = e.target.innerHTML;
    const { num, res, sign: prevSign } = calc;
    if (num && prevSign) {
      setCalc({
        ...calc,
        res: formatNumber(calculate(Number(removeSpaces(res)), Number(removeSpaces(num)), prevSign)),
        num: 0,
        sign,
      });
    } else {
      setCalc({
        ...calc,
        sign,
        res: num ? num : res,
        num: 0,
      });
    }
  };

  const handleEqualsClick = () => {
    const { num, res, sign: prevSign } = calc;
    if (prevSign && num) {
      const result = calculate(Number(removeSpaces(res)), Number(removeSpaces(num)), prevSign);
      setCalc({
        ...calc,
        res:
          num === "0" && prevSign === "/"
            ? "Can't divide with 0"
            : formatNumber(result),
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
    const num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
  }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
