/* eslint-disable */
import { Grid, Paper } from '@material-ui/core'
import { Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const ResumeGraphic = ({ data }) => {

  return (
    <Grid container component={Paper} style={{ height: 300 }}>
            <Grid item xs={12} style={{padding: 20}}>
      </Grid>
      <Grid item>
        <BarChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="previousMonth" name="Mes pasado" fill="#8884d8" />
          <Bar dataKey="currentMonth" name='Mes actual' fill="#82ca9d" />
        </BarChart>
      </Grid>
    </Grid>
  )
}

export default ResumeGraphic