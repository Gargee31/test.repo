import React, { useEffect, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis, ScatterChart, Scatter, ZAxis
} from "recharts";
import getDummyData from "../../dataservice.js";
import "./styles.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Summary = () => {
  const [data, setData] = useState([
    { timestamp: Date.now(), severity: 2, anomalyCount: 5 },
    { timestamp: Date.now() + 100000, severity: 3, anomalyCount: 3 },
    { timestamp: Date.now() + 200000, severity: 1, anomalyCount: 7 }
  ]);

  const processDataForLineChart = () => {
    const processedData = data.map((item, index) => ({
      name: new Date(item.timestamp).toLocaleString(),
      anomaly: index + 1
    }));
    return processedData;
  };

  const processDataForBarChart = () => {
    const processedData = data.map((item) => ({
      name: new Date(item.timestamp).toLocaleString(),
      severity: item.severity
    }));
    return processedData;
  };

  const processDataForPieChart = () => {
    const severityCount = data.reduce((acc, item) => {
      acc[item.severity] = (acc[item.severity] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(severityCount).map((key) => ({
      name: `Severity ${key}`,
      value: severityCount[key]
    }));
  };

  const processDataForScatterChart = () => {
    const processedData = data.map((item) => ({
      x: new Date(item.timestamp).getTime(),
      y: item.severity,
      z: item.anomalyCount || 1
    }));
    return processedData;
  };

  return (
    <div className="dashboard">
      <h1>Anomaly Summary Dashboard</h1>
      <div className="chart-container">
        <div className="chart">
          <h2>Anomalies Detected Over Time</h2>
          <LineChart
            width={600}
            height={300}
            data={processDataForLineChart()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="anomaly"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="chart">
          <h2>Anomaly Severity Over Time</h2>
          <BarChart
            width={600}
            height={300}
            data={processDataForBarChart()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="severity" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className="chart">
          <h2>Severity Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={processDataForPieChart()}
              cx={200}
              cy={200}
              outerRadius={120}
              innerRadius={60}
              label
            >
              {processDataForPieChart().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="chart">
          <h2>Anomaly Scatter Plot</h2>
          <ScatterChart
            width={600}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              name="Time"
              domain={['auto', 'auto']}
              tickFormatter={(tick) => new Date(tick).toLocaleString()}
            />
            <YAxis type="number" dataKey="y" name="Severity" />
            <ZAxis type="number" dataKey="z" range={[60, 400]} name="Anomaly Count" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Anomalies" data={processDataForScatterChart()} fill="#8884d8" />
          </ScatterChart>
        </div>
      </div>
    </div>
  );
};

export default Summary;
