import { useState } from "react";
import Section from "../../UI/section/section.ui";
import TaskForm from "../task-form/task-form.component";
const NewTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const url =
        "https://task-form-project-default-rtdb.firebaseio.com/tasks.json";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ text: taskText }),
        headers: {
          "content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Request Denied!");
      }
      const data = await response.json();
      console.log(data);
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
      console.log(createdTask);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};
export default NewTask;
