import React, { useRef } from 'react'
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import PieChart from './PieChart'
import ShowTable from './ShowTable'
import { Grid } from '@mui/material'
import MDBox from 'components/MDBox'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
)

const LineChart = ({ data, setRef }) => {
    const options = {
        plugins: {
            legend: {
                position: 'bottom'
            },
        },
    }

    const chartRef = useRef(ChartJS)
    if(setRef) setRef(chartRef)

    return (
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } sm={ 12 } md={ 8 } lg={ 8 } xl={ 8 }>
                <MDBox>
                    <Line data-testid='myCanvas' options={ options } data={ data } ref={ chartRef } />
                </MDBox>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 } xl={ 4 }>
                <MDBox>
                    <PieChart data={ data } />
                </MDBox>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
                <MDBox>
                    <ShowTable data={ data } />
                </MDBox>
            </Grid>
        </Grid>
    )
}

export default LineChart