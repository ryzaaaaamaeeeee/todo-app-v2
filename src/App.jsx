import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  //ADD TASKS
  function addTask(text, dueDate) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      completedAt: null,
      dueDate : dueDate || null,
    };
    setTasks([...tasks, newTask]);
  }

  //TOGGLE COMPLETE
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toString() : null,
            }
          : task,
      ),
    );
  }

  //DELETE TASKS
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //EDIT TASKS
  function editTask(id, updatedText, updatedDueDate) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: updatedText, dueDate: updatedDueDate } : task,
      ),
    );
  }

  return (
    <div className="app">
      <h1>To-Do App V2</h1>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <p className="counter">
        {activeCount === 0
          ? "No pending tasks!"
          : `${activeCount} task${activeCount > 1 ? "s" : ""} left`}
      </p>

      <TodoForm onAdd={addTask} />
      <TodoList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
