import { useRef } from "react";

import classes from "./task-form.module.css";

const TaskForm = (props) => {
  const taskInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredValue = taskInputRef.current.value;
    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input type="text" ref={taskInputRef} />
      <button> {props.loading ? "Sending..." : "Add Task"} </button>
    </form>
  );
};
export default TaskForm;
