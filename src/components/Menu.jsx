import React, { useState } from "react";
import Read from "../images/read.png";
import Write from "../images/write.png";
import Graph from "../images/graph.png";

const colors = ["#FAA7AF", "#D9A35F", "#F0EB75", "#5FD97B", "#6FCEFC"];
export const Menu = ({
  setCurrentWindow,
  currentWindow,
  currentColor,
  setCurrentColor,
}) => {
  const [selectColor, setSelectColor] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1em",
        padding: "1em",
        boxSizing: "border-box",
        width: "100%",
        height: "10vh",
        backgroundColor: "#000",
      }}
    >
      <div
        onClick={() => setSelectColor(!selectColor)}
        style={{
          position: "absolute",
          left: "1em",
          cursor: "pointer",
          backgroundColor: currentColor,
          width: "35px",
          height: "35px",
          borderRadius: "10px",
        }}
      />
      {selectColor && (
        <div
          style={{
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            position: "absolute",
            left: ".5em",
            top: "3.3em",
            padding: ".5em",
            boxSizing: "border-box",
            borderRadius: "10px",
            zIndex: "1",
          }}
        >
          {colors.map((c) => (
            <div
              onClick={() => {
                setCurrentColor(c);
                setSelectColor(false);
              }}
              style={{
                backgroundColor: c,
                width: "35px",
                height: "35px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
      <div
        className={
          currentWindow === "write" ? "menu-button selected" : "menu-button"
        }
        onClick={() => setCurrentWindow("write")}
      >
        <img
          src={Write}
          alt="write"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <div
        className={
          currentWindow === "read" ? "menu-button selected" : "menu-button"
        }
        onClick={() => setCurrentWindow("read")}
      >
        <img src={Read} alt="read" style={{ width: "30px", height: "30px" }} />
      </div>
      <div
        className={
          currentWindow === "stats" ? "menu-button selected" : "menu-button"
        }
        onClick={() => setCurrentWindow("stats")}
      >
        <img
          src={Graph}
          alt="graph"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    </div>
  );
};
