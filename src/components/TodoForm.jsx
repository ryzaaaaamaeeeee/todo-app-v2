import { useState } from "react";

function TodoForm({ onAdd }) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDueDate, setShowDueDate] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === "") return;
    onAdd(input.trim(), dueDate);
    setInput("");
    setDueDate("");
    setShowDueDate(false);
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>

      <label className="due-date-toggle">
        <input
          type="checkbox"
          checked={showDueDate}
          onChange={(e) => setShowDueDate(e.target.checked)}
        />{" "}
        Set due date?
      </label>

      {showDueDate && (
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      )}
    </form>
  );
}

export default TodoForm;
