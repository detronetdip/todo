import React, { useRef, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contextStore } from "../App";
import Create_icon_circle from "../assets/svg-icons/Create_icon_circle";
type Todo = {
  todo: string;
};
function Home() {
  const td=useContext(contextStore);
  const input = useRef();
  const addTodo = (_e: any) => {
    //@ts-ignore
    const val = input.current.value;
    if (val == "") {
      toast.error("Enter Todo first.", {
        autoClose: 1000,
      });
    } else {
      td.setTodo((e: any) => {
        return [...e, {body:val,id:5}];
      });
      //@ts-ignore
      input.current.value = "";
    }
  };
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="header">
            <h4>All Todo</h4>
          </div>
          <div className="mainbody">
            {td.todo?.map((_e: any) => (
              <Todo todo={_e.body} />
            ))}
          </div>
          <div className="addbox">
            <div className="inpbx">
              <input type="text" placeholder="Type your todo" ref={input} />
              <button onClick={addTodo}>
                <Create_icon_circle />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
const Todo = (props: Todo) => {
  const test = (_e: any) => {
    console.log(_e.target);
  };
  return (
    <>
      <div className="todoRow" onClick={test}>
        <div className="todo">{props.todo}</div>
      </div>
    </>
  );
};
export default Home;
