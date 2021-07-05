import { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { ModalContext } from './Modal';

export const TaskContext = createContext({
  inputValue: '',
  setInputValue: () => {},
  tasks: null,
  taskIndex: null,
  setTaskindex: () => {},
  handleNewTask: () => {},
  editTaskHandler: () => {},
  deleteTaskHandler: () => {},
  completeTaskHandler: () => {}
});

const TaskProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [taskIndex, setTaskindex] = useState('');

  const {
    handleCloseDeleteModal,
    handleCloseEditModal,
    handleCloseNewTaskModal
  } = useContext(ModalContext);

  // new task handler
  const handleNewTask = () => {
    const newTask = {
      title: inputValue,
      id: v4(),
      isDone: false
    };
    const oldTasks = tasks;
    oldTasks.push(newTask);
    setTasks(oldTasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setInputValue('');
    handleCloseNewTaskModal();
  };

  // edit task handler
  const editTaskHandler = (index, inputValue) => {
    const allTasks = [...tasks];
    allTasks[index].title = inputValue;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    handleCloseEditModal();
  };

  // delete task handler
  const deleteTaskHandler = index => {
    const allTasks = [...tasks];
    allTasks.splice(index, 1);
    setTasks(allTasks);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    handleCloseDeleteModal();
  };

  // complete task handler
  const completeTaskHandler = (e, index) => {
    const allTasks = [...tasks];
    allTasks[index].isDone = !allTasks[index].isDone;
    e.target.classList.toggle('completed');
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  };

  return (
    <TaskContext.Provider
      value={{
        editTaskHandler,
        completeTaskHandler,
        deleteTaskHandler,
        handleNewTask,
        inputValue,
        setInputValue,
        tasks,
        taskIndex,
        setTaskindex
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
