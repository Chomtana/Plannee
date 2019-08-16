import React from 'react';
import {PieChart, Pie, Sector, Cell} from 'recharts';
import RefContainer from './../../refsystem/RefContainer';
import useSelectorRef from './../../refsystem/useSelectorRef';
import useGlobalRef from '../../refsystem/useGlobalRef';

/*const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];*/

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

export default function ChartSummary(props) {
  const maxWidth = 300;
  const width = Math.min(window.innerWidth, maxWidth);
  const height = width;

  const refs = new RefContainer(props);
  const records = refs.records();
  const categories = refs.categories();

  const {sum_bycategory, data} = props;


  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = outerRadius + 5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <center>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={width/2}
          cy={height/2}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={width/3}
          innerRadius={width/4}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </center>
  );
}
