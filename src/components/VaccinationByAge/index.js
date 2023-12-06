import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  console.log(vaccinationByAge)
  return (
    <div className="gender-container">
      <h1 className="title">Vaccination by Age</h1>

      <PieChart width={800} height={300}>
        <Pie
          cx="70%"
          cy="40%"
          data={vaccinationByAge}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="above60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
