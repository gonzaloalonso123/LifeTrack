import React, { useEffect, useRef } from "react";

export const Day = ({ day }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.innerHTML = `<h3 style="color:gray; margin-bottom:1em">${day.date}</h3>`;
    divRef.current.innerHTML += `<hr style="width:100%; margin-top:1em; margin-bottom:1em;"></hr>`;
    divRef.current.innerHTML += day.html;
  }, []);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        borderRadius: "2px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        width: "100%",
        marginTop: "1em",
      }}
    >
      <div ref={divRef}></div>
      <hr
        style={{
          width: "100%",
          marginTop: "1em",
          marginBottom: "1em",
          backgroundColor: "lightgray",
        }}
      ></hr>
      <div>
        <h1>Checkpoints</h1>
        {day.checks.map((c) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "1em",
                alignItems: "center",
              }}
            >
              <p>{c.name}</p>
              <p
                style={{
                  color:
                    c.type === "text"
                      ? "black"
                      : c.type === "number"
                      ? "blue"
                      : c.value === "true"
                      ? "green"
                      : "red",
                }}
              >
                {c.type !== "checkbox" && c.value}
                {c.type === "checkbox" ? c.value === 1 ? "✅" : "❌" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
