import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

function App() {

  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const [tasks, setTasks] = useState(initialTasks);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  });

  const [editingTask, setEditingTask] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterDueDate, setFilterDueDate] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTask(null);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = () => {
    if (editingTask) {
      // Edit existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      // Add new task
      setTasks((prevTasks) => [
        ...prevTasks,
        { ...newTask, id: prevTasks.length + 1, completed: false },
      ]);
    }
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
    });
    closeModal();
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
    setNewTask(taskToEdit);
    openModal();
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const filterTasks = () => {
    const filteredTasks = tasks.filter(
      (task) =>
        (!filterDueDate || task.dueDate === filterDueDate) &&
        (filterPriority === 'All' || task.priority === filterPriority) &&
        (!searchTitle || task.title == searchTitle)
    );
    return filteredTasks;
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <div>
        <label>
          Filter by Due Date:
          <input
            type="date"
            value={filterDueDate}
            onChange={(e) => setFilterDueDate(e.target.value)}
          />
        </label>
        <label>
          Filter by Priority:
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label>
          Search by Title:
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </label>
        <button onClick={openModal}>Add Task</button>
      </div>

      <div>
        <h2>Upcoming Tasks</h2>
        <ul>
          {filterTasks()
            .filter((task) => !task.completed && new Date(task.dueDate) >= new Date() && task.title.toLowerCase().includes(searchTitle.toLowerCase()))
            .map((task) => (
              <li key={task.id} className={`upcoming-task ${task.priority.toLowerCase()}-priority`}>
                {task.title} - {task.dueDate} ( {task.priority} )<br /><br />
                {task.description}<br /><br />
                <button onClick={() => completeTask(task.id)}>Complete</button>
                <button onClick={() => editTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2>Overdue Tasks</h2>
        <ul>
          {filterTasks()
            .filter((task) => !task.completed && new Date(task.dueDate) < new Date() && task.title.toLowerCase().includes(searchTitle.toLowerCase()))
            .map((task) => (
              <li key={task.id} className={`upcoming-task ${task.priority.toLowerCase()}-priority`}>
                {task.title} - {task.dueDate} ( {task.priority} )<br /><br />
                {task.description}<br /><br />
                <button onClick={() => completeTask(task.id)}>Complete</button>
                <button onClick={() => editTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2>Completed Tasks</h2>
        <ul>
          {filterTasks()
            .filter((task) => task.completed && task.title.toLowerCase().includes(searchTitle.toLowerCase()))
            .map((task) => (
              <li key={task.id} className={`complete-task ${task.priority.toLowerCase()}-priority`}>
                {task.title} - {task.dueDate} ( {task.priority} )<br /><br />
                {task.description}<br /><br />
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <button type="button" onClick={addTask}>
            {editingTask ? 'Edit Task' : 'Add Task'}
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default App;