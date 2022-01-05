/* eslint-disable */
import { Grid, Paper, Typography } from "@material-ui/core";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const AppointmentGraphic = ({data}) => {

  console.log(data)

  const dataG = data ? [
    { name: 'Realizadas', value: data?.realizados, color: '#00C49F' },
    { name: 'Canceladas', value: data?.cancelados, color: '#f44336' }
  ] :
   [
    { name: 'Realizadas', value: 10, color: '#00C49F' },
    { name: 'Canceladas', value: 5, color: '#f44336' }
  ];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Grid container component={Paper} style={{height: 300}}>
      <Grid item xs={12} style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25}}>
        <Typography gutterBottom >Citas agendadas vs canceladas</Typography>
      </Grid>
      <Grid item xs={12}>
        <PieChart width={200} height={230} style={{margin: '0 auto'}}>
          <Pie
            data={dataG}
            cx="50%"
            cy="50%"
            label
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataG.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend wrapperStyle={{width:200,whiteSpace:"break-spaces"}}/>
        </PieChart>
      </Grid>
    </Grid>
  )
}

export default AppointmentGraphic