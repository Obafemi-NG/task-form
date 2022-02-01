import { Fragment, useEffect, useState, useCallback } from "react";
import NewTask from "../src/components/new-task/new-task.component";
import Tasks from "./components/tasks/tasks.component";
import useApi from "./custom-hooks/useApi.hooks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTask } = useApi();

  useEffect(() => {
    const loadedData = (apiData) => {
      const loadedTask = [];
      for (const taskKey in apiData) {
        loadedTask.push({ id: taskKey, text: apiData[taskKey].text });
      }
      setTasks(loadedTask);
    };
    fetchTask(
      {
        url: "https://task-form-project-default-rtdb.firebaseio.com/tasks.json",
      },
      loadedData
    );
  }, [fetchTask]);

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
