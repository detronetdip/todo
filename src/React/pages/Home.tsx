import React, { useRef, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contextStore } from "../App";
import Create_icon_circle from "../assets/svg-icons/Create_icon_circle";
class idGen {
  constructor() {}
  getword(r: number) {
    var t = "TabScAdeXJBfgQhYijDklEmnUZCopqKIrstRGuvwVLFxtWzMPON",
      a = "";
    const n = t.length;
    for (var o = 0; o < r; o++) a += t.charAt(Math.floor(Math.random() * n));
    return a;
  }
  //@ts-ignore
  range(r: number, t: number) {
    var a = this.random(1);
    //@ts-ignore
    return a >= r && a <= t ? a : this.range(r, t);
  }
  randNum() {
    return Math.floor(10 * Math.random());
  }
  random(r = 5) {
    for (var t = "", a = 0; a < r; a++) t += Math.floor(10 * Math.random());
    return t;
  }
  alphaN(r = 10) {
    for (
      var t = [this.getword, this.random, this.getword, this.random],
        a = "",
        n = 0;
      n < r;
      n++
    )
      a += t[this.range(0, 3)](1);
    return a;
  }
}
type Todo = {
  todo: string;
  id: string;
  mod: Function;
};
function Home() {
  const test = (_e: any) => {
    var y = td.todo.findIndex((e: { id: any }) => e.id === _e);
    td.todo.splice(y, 1);
    td.setTodo(td.todo);
  };
  var ids = new idGen();
  const td = useContext(contextStore);
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
        return [...e, { body: val, id: ids.alphaN(8) }];
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
              <Todo todo={_e.body} id={_e.id} mod={test} />
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
  return (
    <>
      <div className="todoRow" onClick={() => props.mod(props.id)}>
        <div className="todo">{props.todo}</div>
      </div>
    </>
  );
};
export default Home;
