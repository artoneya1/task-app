export default function Input({ value, onChange, onEnter }) {
  return (
    <input
      className="input-field"
      type="text"
      placeholder="Add a new task"
      value={value}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") onEnter();
      }}
    />
  );
}