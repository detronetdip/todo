const { ipcRenderer, contextBridge } = require("electron");

var allApi = {
  getAllTodo: (event: string, cb: Function, data: string) => {
    //@ts-ignore
    ipcRenderer.send(event,data);
    ipcRenderer.on("setstate", (e, n) => {
      cb(n);
    });
  },
  //@ts-ignore
  setATodo: (event: string, cb: Function, data: Array) => {
    //@ts-ignore
    ipcRenderer.send(event,data);
    ipcRenderer.on("done", (e, n) => {
      cb(n);
    });
  }, 
};
contextBridge.exposeInMainWorld("electron", allApi);
