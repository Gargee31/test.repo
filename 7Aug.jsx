import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import "./styles.css";

// Dummy data service to simulate real-time data
const getDummyData = async () => {
  const timestamp = new Date().toISOString();
  const anomaly = Math.random() > 0.8; // 20% chance of an anomaly
  const ipAddress = `192.168.0.${Math.floor(Math.random() * 255)}`;
  return [{ timestamp, description: anomaly ? "Anomaly detected" : "Normal activity", ipAddress }];
};

const Anomaly = () => {
  const [data, setData] = useState([
    { timestamp: new Date().toISOString(), description: "Normal activity", ipAddress: "192.168.0.1" }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDummyData();
        if (Array.isArray(result)) {
          setData(prevData => [...prevData, ...result]);
        } else {
          console.error("Fetched data is not an array", result);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const processDataForChart = () => {
    return data.map((item, index) => ({
      name: new Date(item.timestamp).toLocaleTimeString(),
      anomaly: index + 1,
    }));
  };

  return (
    <div className="anomaly-page">
      <h1>Anomaly Dashboard</h1>
      <div className="chart-container">
        <div className="chart">
          <h2>Anomalies Detected Over Time</h2>
          <LineChart
            width={600}
            height={300}
            data={processDataForChart()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="anomaly" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>

      <div className="details">
        <h2>Anomaly Details</h2>
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Description</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ color: item.description === "Anomaly detected" ? "red" : "black" }}>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
                <td>{item.description}</td>
                <td>{item.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Anomaly;
