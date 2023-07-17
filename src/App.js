import "flag-icon-css/css/flag-icons.css";
import { data } from "./nations";
import { useEffect, useState } from "react";

function App() {
  const [country, setCountry] = useState([]);
  const [flagCountry, setFlagCountry] = useState([]);
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [showAnswer, setShowAnswer] = useState(false);

  const generateRandomNations = () => {
    const selectedCity = [];

    for (let i = 0; i < 4; i++) {
      const four = Math.floor(Math.random() * data.length);
      selectedCity.push(data[four]);
    }

    setCountry(selectedCity);

    setFlagCountry(selectedCity[Math.floor(Math.random() * 4)]);
  };

  const verifyAnswer = (c) => {
    setSelectedAnswer(c);
    if (flagCountry.name === c.name) {
      setScore({
        ...score,
        total: score.total + 1,
        correct: score.correct + 1,
      });
    } else {
      setScore({
        ...score,
        total: score.total + 1,
        incorrect: score.incorrect + 1,
      });
    }
    setShowAnswer(true);
    setTimeout(() => {
      generateRandomNations();
      setShowAnswer(false);
    }, 5000);
  };

  useEffect(() => {
    generateRandomNations();
  }, []);

  return (
    <div className="container my-5 text-center">
      <h2 className="my-2">
        Total Attempts: {score.total} / Correct Answer: {score.correct} /
        Incorrect Answer: {score.incorrect}
      </h2>
      <span className={`flag-icon flag-icon-${flagCountry.code}`}></span>
      <div>
        {country.map((c, i) => (
          <button
            className="btn btn-primary mx-4 my-2"
            key={i}
            onClick={() => {
              verifyAnswer(c);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div>
        {showAnswer && (
          <h2
            className={`text-${
              flagCountry.name === selectedAnswer.name ? "success" : "danger"
            }`}
          >
            Correct Answer: {flagCountry.name}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
