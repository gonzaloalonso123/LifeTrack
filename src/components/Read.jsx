import React, { useEffect, useState } from "react";
import axios from "axios";
import { Day } from "./Day";
import { Pass } from "./Pass";
import { motion } from "framer-motion";
import Next from "../images/next.png";

export const Read = () => {
  const [pass, setPass] = useState(false);
  const [days, setDays] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getHTML = async () => {
      const data = await axios.get(`http://localhost:12901/notes/${page}`);
      setDays([...days, ...data.data]);
    };
    if (pass) {
      getHTML();
    }
  }, [pass, page]);

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100%",
        padding: ".2em",
        boxSizing: "border-box",
      }}
    >
      {!pass ? (
        <motion.div
          initial={{ opacity: 0, y: "15%" }}
          whileInView={{ opacity: 1, y: "0" }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <Pass setPass={setPass} />
        </motion.div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
              flexDirection: "column",
              paddingBottom: "5em",
            }}
          >
            {days.map((d) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: "15%" }}
                  whileInView={{ opacity: 1, y: "0" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <Day day={d} />
                </motion.div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "2em",
              padding: "2em",
            }}
          >
            <img
              onClick={() => {
                setPage(page + 1);
              }}
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              src={Next}
            />
          </div>
        </div>
      )}
    </div>
  );
};
