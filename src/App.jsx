import "./components/main.scss";
import Input from "./components/Input";
import Button from "./components/Button";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    "First task", "Second task"
  ]);
  return (
    <div className="container">
      <h1>My Todo List</h1>

      <div className="todo">

        <div className="todo__input">
          <input type="text" className="input-field" placeholder="Add a new task" />
          <button className="btn btn--primary">Add</button>
        </div>
        
        <div className="counter-container">
          <ul className="scroll">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <p>{tasks.length} items total</p>
          <button className="btn btn--danger">Delete All</button>
        </div>

      </div>

    </div>
  );
}

/*
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}
*/
