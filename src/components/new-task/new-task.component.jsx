// import { useState } from "react";
import Section from "../../UI/section/section.ui";
import TaskForm from "../task-form/task-form.component";
import useApi from "../../custom-hooks/useApi.hooks";
const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useApi();

  const enterTaskHandler = async (taskText) => {
    const addedData = (apiData) => {
      const generatedId = apiData.name;
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
      console.log(createdTask);
    };

    sendRequest(
      {
        url: "https://task-form-project-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ text: taskText }),
      },
      addedData
    );

    // try {
    //   const url =
    //     "https://task-form-project-default-rtdb.firebaseio.com/tasks.json";
    //   const response = await fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify({ text: taskText }),
    //     headers: {
    //       "content-Type": "application/json",
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error("Request Denied!");
    //   }
    // const data = await response.json();
    // console.log(data);
    // const generatedId = data.name;
    // const createdTask = { id: generatedId, text: taskText };
    // props.onAddTask(createdTask);
    // console.log(createdTask);
  };
  //   } catch (error) {
  //     setError(error.message || "Something went wrong!");
  //   }
  //   setIsLoading(false);
  // };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};
export default NewTask;
