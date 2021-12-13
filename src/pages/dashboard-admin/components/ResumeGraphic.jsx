/* eslint-disable */
import { Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const ResumeGraphic = ({data}) => {

    return (
        <BarChart
            width={1000}
            height={300}
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
    )
}

export default ResumeGraphic