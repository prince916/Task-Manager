import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import { URL } from "../App";
import loadingImg from "../assets/loader.gif";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  


  const [formData, setformData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Task added successfully");
      setformData({ ...formData, name: "" });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

const getSingleTask = async (task) => {
    setformData({ name: task.name, completed: false });
    setTaskID(task._id)
    setIsEditing(true)
};

const updateTask = async (e) => {
    e.preventDefault()
    if( name === "") {
        return toast.error("Input field cannot be empty");
    }
    try {
        await axios.put(`${URL}/api/tasks/${taskID}`, formData);
        setformData({...formData, name: ""});
        setformData(false);
        getTasks();
    } catch (error) {
        toast.error(error.message);
    }
};

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> 0
        </p>
        <p>
          <b>Completed Tasks:</b> 0
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default TaskList;
