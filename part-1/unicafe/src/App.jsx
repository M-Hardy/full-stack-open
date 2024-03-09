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

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return "No feedback given";
  } else {
    const avg = (good - bad) / total;
    const positivePercentage = `${(good / total) * 100} %`;
    return (
      <table>
        <tbody>
          <StatisticLine title="good" value={good} />
          <StatisticLine title="neutral" value={neutral} />
          <StatisticLine title="bad" value={bad} />
          <StatisticLine title="all" value={total} />
          <StatisticLine title="average" value={avg} />
          <StatisticLine title="positive" value={positivePercentage} />
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

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <Header value="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header value="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
