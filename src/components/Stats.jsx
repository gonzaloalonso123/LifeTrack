import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
  Scatter,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Pass } from "./Pass";

export const Stats = ({ color }) => {
  const [currentChecks, setCurrentChecks] = useState([]);
  const [data, setData] = useState([]);
  const [statOpen, setStatOpen] = useState(false);
  const [pass, setPass] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    const getChecks = async () => {
      const checks = await axios.get("http://localhost:12901/lastchecks");
      setCurrentChecks(checks.data);
      setType(checks.data.type);
    };
    getChecks();
  }, []);

  const getOneStat = async (name) => {
    const data = await axios.get(`http://localhost:12901/checks/${name}`);
    setData(data.data.checks);
    setType(data.data.type);
    setStatOpen(true);
    console.log(data.data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
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
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              width: "90%",
              maxWidth: "1000px",
              margin: "0 auto",
              marginTop: "2em",
            }}
          >
            {currentChecks.map((c) => (
              <motion.div
                initial={{ opacity: 0, y: "15%" }}
                whileInView={{ opacity: 1, y: "0" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div
                  style={{
                    border: "1px solid black",
                    padding: "1em",
                    borderRadius: "10px",
                    marginTop: "1em",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                  }}
                  onClick={() => getOneStat(c.name)}
                >
                  <h1>{c.name}</h1>
                </div>
              </motion.div>
            ))}
          </div>
          <div>
            {statOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0,0,0,.5)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "500px",
                    maxWidth: "1000px",
                    padding: "1em",
                    border: "2px solid black",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => setStatOpen(false)}
                  >
                    x
                  </div>
                  <ResponsiveContainer>
                    <AreaChart width={400} height={700} data={data}>
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                      <CartesianGrid strokeDasharray="10 10" />
                      <XAxis dataKey="name" />
                      {type === "number" ? (
                        <YAxis dataKey="value" domain={[0, "dataMax + 5"]} />
                      ) : type === "checkbox" ? (
                        <YAxis dataKey="value" domain={[0, 2]} />
                      ) : (
                        <YAxis dataKey="value" />
                      )}
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        fillOpacity={1}
                        fill={`${color}33`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
