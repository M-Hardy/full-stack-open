import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ title, value }) => (
  <tr>
    <td>{title}</td>
    <td>{value}</td>
  </tr>
);

const Header = ({ value }) => <h1>{value}</h1>;

const Statistics = ({ good, neutral, bad, total, avg, positivePercentage }) => {
  if (total === 0) {
    return "No feedback given";
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine title="good" value={good} />
          <StatisticLine title="neutral" value={neutral} />
          <StatisticLine title="bad" value={bad} />
          <StatisticLine title="all" value={total} />
          <StatisticLine title="average" value={avg} />
          <StatisticLine title="positive" value={positivePercentage + "%"} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const handleGoodClick = () => {
    const newGood = good + 1;
    const newTotal = total + 1;
    setGood(newGood);
    setTotal(newTotal);
    setAvg((newGood - bad) / newTotal);
    setPositivePercentage((newGood / newTotal) * 100);
  };
  const handleBadClick = () => {
    const newBad = bad + 1;
    const newTotal = total + 1;
    setBad(newBad);
    setTotal(newTotal);
    setAvg((good - newBad) / newTotal);
    setPositivePercentage((good / newTotal) * 100);
  };
  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;
    setNeutral(newNeutral);
    setTotal(newTotal);
    setAvg((good - bad) / newTotal);
    setPositivePercentage((good / newTotal) * 100);
  };

  return (
    <div>
      <Header value="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header value="statistics" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        avg={avg}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
