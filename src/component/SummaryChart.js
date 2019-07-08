import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SummaryChart(props) {
  const maxWidth = 300;
  const width = Math.min(window.innerWidth / 2, maxWidth);
  const height = width;

  const records = props.records;
  const categories = props.categories;

  var data = []

  for(var category of categories) {
    var sum = 0;
    for(var record of records) {
      if (record("category")("name")() == category("name")()) {
        sum += record("value")();
      }
    }
    if (sum>0) {
      data.push({name: category("name")(), value: sum});
    }
  }

  console.log(data);

  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={width/2}
        cy={height/2}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  );
}
