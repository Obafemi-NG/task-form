import { Fragment, useEffect, useState } from "react";
import NewTask from "../src/components/new-task/new-task.component";
import Tasks from "./components/tasks/tasks.component";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTask = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const url =
        "https://task-form-project-default-rtdb.firebaseio.com/tasks.json";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request Failed!");
      }
      const data = await response.json();

      const loadedTask = [];
      for (const taskKey in data) {
        loadedTask.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTask);
    } catch (error) {
      setError(error.message || "something went wrong!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const addTaskHandler = (task) => {
    setTasks((prevTask) => prevTask.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={addTaskHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTask}
      />
    </Fragment>
  );
};

export default App;
