import { app, BrowserWindow, dialog, ipcMain, session } from "electron";
import { readFileSync } from "original-fs";
import { basename } from "path";
import fs from "fs";
// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    maxHeight: 450,
    maxWidth: 400,
    minWidth: 400,
    minHeight: 450,
    title: "ToDo",
    autoHideMenuBar: true,
    maximizable: false,
    // for development only
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("start", (event, arg) => {
  if (fs.existsSync(app.getPath("userData") + "/data.json")) {
    var t = JSON.parse(
      fs.readFileSync(app.getPath("userData") + "/data.json").toString()
    );
    if (t.todos) {
      event.reply("setstate", t.todos);
    } else {
      event.reply("setstate", t.todos);
    }
  } else {
    fs.writeFileSync(
      app.getPath("userData") + "/data.json",
      JSON.stringify({ todos: [] })
    );
    event.reply("setstate", t.todos);
  }
});
ipcMain.on("add", (event, arg) => {
  fs.writeFileSync(
    app.getPath("userData") + "/data.json",
    JSON.stringify({ todos: arg })
  );
  event.reply("done", true);
});