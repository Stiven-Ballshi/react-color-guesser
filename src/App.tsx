import { useEffect, useState } from "react";
import "./App.css";
import { generateColor } from "./color";

enum Result {
  Wrong,
  Correct,
}

type Counter = {
  Correct: number;
  Wrong: number;
};

function App() {
  const [color, setColor] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>();
  const [counter, setCounter] = useState<Counter>({ Correct: 0, Wrong: 0 });

  const handleAnswerClicked = (answer: string) => {
    if (answer === color) {
      setResult(Result.Correct);
      setCounter((prevCounter) => ({
        ...prevCounter,
        Correct: prevCounter.Correct++,
      }));
      pickColor();
    } else {
      setResult(Result.Wrong);
      setCounter((prevCounter) => ({
        ...prevCounter,
        Wrong: prevCounter.Wrong++,
      }));
    }
  };

  const pickColor = () => {
    const actualColor = generateColor();
    setColor(actualColor);
    setQuestions(
      [actualColor, generateColor(), generateColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    pickColor();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Color Guesser !</h1>
      <div className="color-box" style={{ background: color }}></div>
      <div className="answers">
        {questions.map((ans, i) => {
          return (
            <button onClick={() => handleAnswerClicked(ans)} key={i}>
              {ans}
            </button>
          );
        })}
      </div>
      {result === Result.Wrong && <div className="wrong">Wrong Answer</div>}
      {result === Result.Correct && (
        <div className="correct">Correct Answer</div>
      )}

      <div className="counter-box">
        <p>Correct: {counter.Correct}</p>
        <p>Wrong: {counter.Wrong}</p>
      </div>
    </div>
  );
}

export default App;
