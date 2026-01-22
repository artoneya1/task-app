export default function Button({ title, variant = "primary" }) {
  return (
    <button className={`button button--${variant}`}>
      {title}
    </button>
  );
}