import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Display = ({ value }) => <div>{value}</div>;

const Header = ({ text }) => <h1>{text}</h1>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    `The first 90 percent of the code accounts for the first 90 percent of 
        the development time...The remaining 10 percent of the code accounts 
        for the other 90 percent of the development time.`,
    `Any fool can write code that a computer can understand. Good programmers 
        write code that humans can understand.`,
    `Premature optimization is the root of all evil.`,
    `Debugging is twice as hard as writing the code in the first place. 
        Therefore, if you write the code as cleverly as possible, you are, by 
        definition, not smart enough to debug it.`,
    `Programming without an extremely heavy use of console.log is same as if 
        a doctor would refuse to use x-rays or blood tests when diagnosing 
        patients.`,
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const handleAnecdoteClick = () => {
    const randomInt = getRandomInt(anecdotes.length);
    setSelected(randomInt);
  };
  const handleVoteClick = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    if (newVotes[selected] > newVotes[mostVotes]) {
      setMostVotes(selected);
    }
    setVotes(newVotes);
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <Display value={anecdotes[selected]} />
      <Display value={"has " + votes[selected] + " votes"} />
      <Button onClick={handleVoteClick} text={"vote"} />
      <Button onClick={handleAnecdoteClick} text={"next anecdote"} />
      <Header text="Anecdote with the most votes" />
      <Display value={anecdotes[mostVotes]} />
      <Display value={"has " + votes[mostVotes] + " votes"} />
    </>
  );
};

export default App;
