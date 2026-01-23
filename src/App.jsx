import "./components/main.scss";
import { useState, useEffect } from "react";
import Input from "./components/Input";
import Button from "./components/Button";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todo"));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!inputValue.trim()) return;
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue("");
  }

  function toggleTask(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function startEdit(index, text) {
  setEditIndex(index);
  setEditValue(text);
  }

  function saveEdit(index) {
  setTasks(
    tasks.map((task, i) =>
      i === index ? { ...task, text: editValue } : task
    )
  );
  setEditIndex(null);
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
              <li key={index} className={task.completed ? "done" : ""}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                />
                {editIndex === index ? (
                  <>
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(index);
                      }}
                    />
                    <Button
                      variant="primary"
                      onClick={() => saveEdit(index)}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <Button
                      variant="primary"
                      onClick={() => startEdit(index, task.text)}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </li>
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
