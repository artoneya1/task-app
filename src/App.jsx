import "./components/main.scss";
import { useState, useEffect } from "react";
import Input from "./components/Input";
import Button from "./components/Button";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [dragId, setDragId] = useState(null);

  /* LOAD TASKS FROM LOCAL STORAGE */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todo"));
    if (stored) setTasks(stored);
  }, []);

  /* SAVE TASKS TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  }, [tasks]);

  /* ADD NEW TASK */
  function addTask() {
    if (!inputValue.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
    ]);
    setInputValue("");
  }

  /* TASK COMPLETED */
  function toggleTask(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  /* EDIT TASK */
  function startEdit(id, text) {
    setEditId(id);
    setEditValue(text);
  }

  /* SAVE TASK */
  function saveEdit(id) {
  if (!editValue.trim()) {
    setTasks(tasks.filter((task) => task.id !== id));
  } else {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: editValue }
          : task
      )
    );
  }
  setEditId(null);
  setEditValue("");
}

  /* REORDER TASKS */
  function reorderTasks(dragId, hoverId) {
    if (dragId === hoverId) return;

    const newTasks = [...tasks];
    const dragIndex = newTasks.findIndex(t => t.id === dragId);
    const hoverIndex = newTasks.findIndex(t => t.id === hoverId);
    const [movedTask] = newTasks.splice(dragIndex, 1);
    newTasks.splice(hoverIndex, 0, movedTask);

    setTasks(newTasks);
} 

  /* DELETE ALL TASKS */
  function deleteAll() {
    setTasks([]);
    setEditId(null);
  }

  /* UI */
  return (
    <div className="container">
      <h1>My Todo List</h1>

      <div className="todo">
        <div className="todo__input">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onEnter={addTask}
          />
          <Button variant="primary" onClick={addTask}>
            Add
          </Button>
        </div>

        <div className="counter-container">
          <ul className="scroll">
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? "done" : ""}
                draggable
                onDragStart={() => setDragId(task.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => reorderTasks(dragId, task.id)}
              >
                <div className="task-row">
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    
                    {editId === task.id ? (
                      <input
                        className="task-edit-input"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(task.id);
                        }}
                        onBlur={() => saveEdit(task.id)}
                        autoFocus
                      />
                    ) : (
                      <span
                        className="task-text"
                        onClick={() => startEdit(task.id, task.text)}
                      >
                        {task.text}
                      </span>
                    )}
                </div>
              </li>
            ))}
          </ul>

          <div className="counter-actions">
            <p>{tasks.length} items total</p>
            <Button variant="danger" onClick={deleteAll}>
              Delete All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}