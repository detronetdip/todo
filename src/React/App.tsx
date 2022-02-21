import React, { createContext, useEffect, useState } from "react";
import Home from "./pages/Home";
const contextStore = createContext(null);

function App() {
  const [todo, setTodo] = useState();
  useEffect(() => {
    // @ts-ignore
    window.electron.getAllTodo("start", (params: Array) => {
      setTodo(params);
    });
  }, []);
  useEffect(() => {
    //@ts-ignore
    window.electron.setATodo(
      "add",
      (param: boolean) => {
        console.log(param);
      },
      todo
    );
  }, [todo]);
  return (
    <contextStore.Provider value={{ todo, setTodo }}>
      <div className="view-container">
        <Home />
      </div>
    </contextStore.Provider>
  );
}
export { contextStore };
export default App;
