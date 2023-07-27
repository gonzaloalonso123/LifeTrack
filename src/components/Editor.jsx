import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Checks } from "./Checks";
import Save from "../images/save.png";
import axios from "axios";

export const Editor = () => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState();
  const [currentChecks, setCurrentChecks] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const todayString = formatDate(new Date(), "dd/mm/yy");
    setDate(todayString);

    const getToday = async () => {
      await axios
        .get(`http://localhost:12901/notes/date/${todayString.replace(/\//g, "-")}`)
        .then((today) => {
          console.log(today.data);
          setValue(today.data.html);
          setCurrentChecks(today.data.checks);
        })
        .catch((err) => {});
    };
    getToday();
  }, []);

  function formatDate(date, format) {
    const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear(),
    };

    return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
  }

  const saveToday = async () => {
    const data = {
      date: date,
      html: value,
      checks: currentChecks,
    };
    setSaved(true);
    await fetch("http://localhost:12901/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data to JSON string
    }).then((res) => {
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2em",
        width: "100%",
        minHeight: "100vh",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "4em auto",
        padding: ".5em",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>{date}</h1>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={{
          height: "500px",
          width: "100%",
        }}
      />
      <Checks
        currentChecks={currentChecks}
        setCurrentChecks={setCurrentChecks}
      />
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#000",
          padding: ".5em",
        }}
      >
        <button
          style={{
            padding: "1em",
            backgroundColor: "#fff",
            borderRadius: "10px",
            color: "#000",
            border: "none",
            height:'30px',
            width:'30px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            cursor: "pointer",
            backgroundColor: saved ? "lightgreen" : "#fff",
          }}
          onClick={saveToday}
        >
          <img src={Save} style={{ width: "1em" }} />
        </button>
      </div>
    </div>
  );
};
