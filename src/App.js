import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Editor } from "./components/Editor";
import { Menu } from "./components/Menu";
import { Read } from "./components/Read";
import { Stats } from "./components/Stats";

function App() {
  const [currentWindow, setCurrentWindow] = useState("write");
  const AppRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#92CCEB");

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.altKey) {
        if (AppRef.current) {
          AppRef.current.classList.toggle("blind-mode");
        }
      }
    });
  }, []);
  return (
    <div
      className="App"
      ref={AppRef}
      style={{
        backgroundColor: currentColor,
        paddingBottom: "5em",
        boxSizing: "border-box",
      }}
    >
      <Menu
        setCurrentWindow={setCurrentWindow}
        currentWindow={currentWindow}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
      {currentWindow === "write" && <Editor />}
      {currentWindow === "read" && <Read />}
      {currentWindow === "stats" && <Stats color={currentColor} />}
    </div>
  );
}

export default App;
