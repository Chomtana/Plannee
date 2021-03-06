import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import sumByCategory from "../action/sumByCategory";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SummaryChart(props) {
  const maxWidth = 300;
  const width = Math.min(
    window.innerWidth /*/ (props.fullWidth ? 1 : 2)*/,
    maxWidth
  );
  const height = width / 1.4;

  const records = props.records;
  const categories = props.categories;

  var data = [];

  var sum_bycate = sumByCategory(records, categories);

  for (var key in sum_bycate) data.push({ name: key, value: sum_bycate[key] });

  //console.log(data);

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={width / 2}
        cy={height / 2}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={width / 3.5}
        innerRadius={width / 4.75}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    </div>
  );
}
