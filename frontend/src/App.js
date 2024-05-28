import { ToastContainer } from 'react-toastify';    // React-Toastify allows you to add notifications to your app with ease.
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
