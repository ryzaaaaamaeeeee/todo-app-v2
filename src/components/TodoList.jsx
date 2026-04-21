import TodoItem from "./TodoItem";

function TodoList ({tasks, onToggle, onDelete, onEdit}){

  if (tasks.length === 0) {
    return <p className="emptyMsg">No tasks left.</p>
  }

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
        key={task.id}
        task = {task}
        onToggle = {onToggle}
        onDelete = {onDelete}
        onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default TodoList;