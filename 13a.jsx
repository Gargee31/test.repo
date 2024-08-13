import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const data = processDataForBarChart(); // This function processes data including the anomaly index

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const maxAnomalyIndex = Math.max(...data.map(d => d.anomalyIndex));

return (
  <div className="chart">
    <h2>Severity Distribution</h2>
    
    {/* Pie Chart for Severity Distribution */}
    <PieChart width={400} height={400}>
      <Pie
        data={processDataForPieChart()}
        cx={200}
        cy={200}
        outerRadius={120}
        innerRadius={60}
        label={({ name, value }) => `${name}: ${value}`}
      >
        {processDataForPieChart().map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>

    {/* Bar Chart for Anomaly Index */}
    <h2>Anomaly Index Over Time</h2>
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis domain={[0, 1]} />
      <Tooltip />
      <Bar
        dataKey="anomalyIndex"
        fill="#8884d8"
        label={{ position: 'top' }}
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.anomalyIndex === maxAnomalyIndex ? '#FF0000' : '#8884d8'}
          />
        ))}
      </Bar>
    </BarChart>
  </div>
);
