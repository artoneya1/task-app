import "./components/main.scss";
import Input from "./components/Input";
import Button from "./components/Button";

export default function App() {
  return (
    <div className="container">
      <h1>My Todo App</h1>
      <div>
        <Input title="Add a new task" />
        <Button title="Add task" />
      </div>
      <p><span id="todoCount">0</span> tasks total</p>
      <Button title="Delete" variant="danger" />
    </div>
  );
}

/*
const Button = ({title}) => {
  <button className={stylesReload.btn}>
    {title}
  </button>
}

const Input = ({title, id, name}) => <input id={id} name={name} className={styles.formControl} placeholder={title} />
*/