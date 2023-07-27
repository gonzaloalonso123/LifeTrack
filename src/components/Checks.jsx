import axios from "axios";
import React, { useEffect, useState } from "react";

export const Checks = ({ currentChecks, setCurrentChecks }) => {
  const [newCheck, setNewCheck] = useState(false);
  const [newCheckName, setNewCheckName] = useState("");
  const [newCheckType, setNewCheckType] = useState("");

  useEffect(() => {
    const getChecks = async () => {
      const checks = await axios.get("http://localhost:12901/lastchecks");
      const newChecks = checks.data.map((c) => {
        return {
          ...c,
          value: c.type === "text" ? "" : c.type === "number" ? 0 : 0,
        };
      });
      setCurrentChecks(newChecks);
    };
    getChecks();
  }, []);

  const saveNewCheck = async () => {
    const data = {
      name: newCheckName,
      type: newCheckType === "boolean" ? "checkbox" : newCheckType,
      value:
        newCheckType === "text" ? "" : newCheckType === "number" ? 0 : 0,
    };
    setCurrentChecks([...currentChecks, data]);
    setNewCheck(false);
  };

  const changeCurrentCheckValue = (value, i) => {
    const newChecks = [...currentChecks];
    let newValue;
    if (newChecks[i].type === "number") {
      newValue = parseInt(value);
    } else if (newChecks[i].type === "checkbox") {
      newValue = value === true ? 1 : 0;
    } else {
      newValue = value;
    }
    console.log(newChecks[i])
    console.log(newValue);
    newChecks[i].value = newValue;
    setCurrentChecks(newChecks);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "1em",
        paddingTop: "3em",
        paddingBottom: "4em",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <h1>Stats</h1>
        <div
          style={{
            backgroundColor: "#22bb33",
            width: "1.5em",
            height: "1.5em",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => setNewCheck(true)}
        >
          +
        </div>
      </div>
      <hr style={{ width: "100%" }}></hr>
      {currentChecks &&
        currentChecks.map((c, i) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "1em",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
                marginBottom: "1em",
              }}
            >
              <label>{c.name}</label>
              <input
                type={c.type}
                onChange={(e) => {
                  if (c.type === "number" || c.type === "text") {
                    changeCurrentCheckValue(e.currentTarget.value, i);
                  } else {
                    changeCurrentCheckValue(e.currentTarget.checked, i);
                  }
                }}
              />
            </div>
          );
        })}

      {newCheck && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "1em",
              borderRadius: "10px",
              color: "#000",
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                right: ".2em",
                cursor: "pointer",
                color: "444",
                fontSize: "1.5em",
              }}
              onClick={() => setNewCheck(false)}
            >
              x
            </div>
            <h3>name</h3>
            <input
              type="text"
              onChange={(e) => setNewCheckName(e.currentTarget.value)}
            />
            <h3>type</h3>
            <select onChange={(e) => setNewCheckType(e.currentTarget.value)}>
              <option value="text">text</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
            </select>
            <button
              onClick={saveNewCheck}
              style={{
                backgroundColor: "#22ff33",
                cursor: "pointer",
                border: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
