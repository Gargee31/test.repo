import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import "./styles.css";

// Dummy data service to simulate real-time data
const getDummyData = (dayOffset = 0) => {
  const baseTimestamp = new Date();
  baseTimestamp.setDate(baseTimestamp.getDate() + dayOffset);
  const timestamps = Array.from({ length: 5 }, (_, i) => {
    const timestamp = new Date(baseTimestamp);
    timestamp.setHours(8 + i * 2); // 8 AM, 10 AM, 12 PM, 2 PM, 4 PM
    return timestamp.toISOString();
  });

  const data = timestamps.map(timestamp => ({
    timestamp,
    description: "Normal activity",
    ipAddress: "10.83.129.233"
  }));

  return data;
};

const Anomaly = () => {
  const [data, setData] = useState(getDummyData(-1)); // Initial data for the previous day
  const [locationChangeDetected, setLocationChangeDetected] = useState(false);

  useEffect(() => {
    if (locationChangeDetected) {
      return;
    }

    const fetchData = async () => {
      const newEntry = {
        timestamp: new Date().toISOString(),
        description: "Location change detected",
        ipAddress: "10.83.129.246"
      };
      setData(prevData => [...prevData, newEntry]);
      setLocationChangeDetected(true); // Stop further updates after location change
    };

    const intervalId = setInterval(fetchData, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [locationChangeDetected]);

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
              <tr key={index} style={{ color: item.description === "Location change detected" ? "red" : "green" }}>
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
