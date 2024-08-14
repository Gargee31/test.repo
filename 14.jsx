import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import "leaflet/dist/leaflet.css";
import "./styles.css";

// Fix marker icon issue with Leaflet and React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

// Dummy data service to simulate real-time data
const getDummyData = (dayOffset = 0) => {
  const baseTimestamp = new Date();
  baseTimestamp.setDate(baseTimestamp.getDate() + dayOffset);

  const timestamps = Array.from({ length: 63 }, (_, i) => {
    const timestamp = new Date(baseTimestamp);
    timestamp.setHours(8 + i * 2);
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
  const [data, setData] = useState(getDummyData(-1));
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
      setLocationChangeDetected(true);
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [locationChangeDetected]);

  const processDataForChart = () => {
    return data.map((item, index) => ({
      name: new Date(item.timestamp).toLocaleTimeString(),
      anomaly: index + 1
    }));
  };

  // Coordinates for some major cities in India
  const cities = [
    { name: "Mumbai", coordinates: [19.0760, 72.8777] },
    { name: "Delhi", coordinates: [28.6139, 77.2090] },
    { name: "Bangalore", coordinates: [12.9716, 77.5946] },
    { name: "Chennai", coordinates: [13.0827, 80.2707] },
    { name: "Kolkata", coordinates: [22.5726, 88.3639] },
  ];

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

      <h2>Anomaly Details</h2>
      <div className="details">
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

      <div className="map-container">
        <h2>Map of India</h2>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {cities.map((city, index) => (
            <Marker key={index} position={city.coordinates}>
              <Popup>{city.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Anomaly;


.anomaly-page {
  padding: 20px;
}

.chart-container {
  margin-bottom: 20px;
}

.details table {
  width: 100%;
  border-collapse: collapse;
}

.details th, .details td {
  border: 1px solid #ddd;
  padding: 8px;
}

.map-container {
  margin-top: 20px;
}
