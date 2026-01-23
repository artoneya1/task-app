import "./components/main.scss";
import { useState, useEffect } from "react";
import Input from "./components/Input";
import Button from "./components/Button";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todo"));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (inputValue.trim() === "") return;
    setTasks([...tasks, inputValue]);
    setInputValue("");
  }

  function deleteAll() {
    setTasks([]);
  }

  return (
    <div className="container">
      <h1>My Todo List</h1>

      <div className="todo">
        <div className="todo__input">
          <Input value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onEnter={addTask}
          />
          <Button variant="primary" onClick={addTask}>Add</Button>
        </div>
        
        <div className="counter-container">
          <ul className="scroll">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>

          <div className="counter-actions">
            <p>{tasks.length} items total</p>
            <Button variant="danger" onClick={deleteAll}>Delete All</Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
