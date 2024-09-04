import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task = { text: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    const newTasks = [...tasks];
    newTasks[editIndex].text = editText;
    setTasks(newTasks);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Mostrar mensagem quando não houver tarefas */}
      {tasks.length === 0 ? (
        <p>Your task list is empty. Start by adding a task!</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              {editIndex === index ? (
                <div className="edit-group">
                  <input 
                    type="text" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                  />
                  <button onClick={saveEdit}>Save</button>
                </div>
              ) : (
                <span onClick={() => toggleTask(index)}>{task.text}</span>
              )}
              <div className="action-buttons">
                <button onClick={() => startEdit(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
