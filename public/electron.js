import { app, BrowserWindow, nativeTheme } from "electron";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // if frameless
    icon: path.join(__dirname, "prulifeLogo.png"), // <-- your icon here
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? "#171717" : "#ffffff", // ✅ auto-color
      symbolColor: nativeTheme.shouldUseDarkColors ? "#ffffff" : "#000000",
      height: 40,
    },
    webPreferences: {
      nodeIntegration: true, // only if you need Node
      contextIsolation: false, // if using nodeIntegration
      enableRemoteModule: true, // optional
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on("focus", () => {
    mainWindow.webContents.focus();
  });
  mainWindow.removeMenu();
  mainWindow.on("blur", () => {
    console.log("Window lost focus");
  });

  mainWindow.on("focus", () => {
    mainWindow.webContents.focus(); // ensure web contents can accept input
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    const indexPath = path.join(app.getAppPath(), "dist", "index.html");
    mainWindow.loadFile(indexPath).catch((err) => {
      console.error("Failed to load index.html:", err);
    });
  }

  // 🔄 Listen for system dark/light mode changes
  nativeTheme.on("updated", () => {
    const isDark = nativeTheme.shouldUseDarkColors;
    mainWindow.setTitleBarOverlay({
      color: isDark ? "#171717" : "#ffffff",
      symbolColor: isDark ? "#ffffff" : "#000000",
    });

    // Optional: tell renderer to adjust theme
    mainWindow.webContents.send("theme:changed", isDark ? "dark" : "light");
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
