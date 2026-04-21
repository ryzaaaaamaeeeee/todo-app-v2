import { useState } from "react";

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const isOverdue =
    !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  function handleEdit() {
    if (editText.trim() === "") return;
    onEdit(task.id, editText, editDueDate);
    setIsEditing(false);
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        //EDIT MODE
        <>
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          />

          <input
            type="datetime-local"
            value={editDueDate || ""}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
        </>
      ) : (
        //VIEW MODE
        <div className="task-info">
          <span className={task.completed ? "strikethrough" : ""}>
            {task.text}
          </span>

          {task.dueDate && (
            <p className="timestamp">
              Due: {new Date(task.dueDate).toLocaleString()}
            </p>
          )}

          {task.completedAt && (
            <p className="timestamp">
              Done at: {new Date(task.completedAt).toLocaleString()}
            </p>
          )}

          {isOverdue && <p className="overdue">⚠️ Overdue!</p>}
        </div>
      )}

      <div>
        {isEditing ? (
          <>
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
