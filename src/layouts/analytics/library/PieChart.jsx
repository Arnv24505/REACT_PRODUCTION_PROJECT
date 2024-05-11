import React, {useEffect, useRef, useState} from 'react'
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import {Pie} from 'react-chartjs-2'
import _ from 'lodash'

ChartJS.register(ArcElement, Tooltip, Legend,)

const PieChart = ({data, setRef}) => {
    const chartRef = useRef(ChartJS)
    if (setRef) setRef(chartRef)

    const [pieData, setPieData] = useState({
        labels: [], datasets: [{
            label: '', backgroundColor: [], data: []
        }]
    })
    useEffect(() => {
        const {datasets} = data
        //require pie data sets
        const requirePieDataSets = [{
            labels: [], datasets: [{
                backgroundColor: [], data: []
            }]
        }]
        //push data in require pie data
        datasets.map((singleData) => {
            _.first(requirePieDataSets).labels.push(singleData.label)
            _.first(_.last(requirePieDataSets).datasets).backgroundColor.push(singleData.backgroundColor)
            _.first(_.last(requirePieDataSets).datasets).data.push(singleData.data)
        })
        let copyPiData = []
        //data accumulat in total and pass to require pie data setes
        _.first(_.last(requirePieDataSets).datasets).data.map((value) => {
            const pieDataTotal = _.sum(value)
            copyPiData.push(pieDataTotal)
        })
        _.first(_.last(requirePieDataSets).datasets).data = copyPiData
        setPieData(_.first(requirePieDataSets))
    }, [data])

    const options = {
        plugins: {
            legend: {
                position: 'bottom', align: 'center',
            },
        },
    }
    return (<div>
        <Pie data-testid='pieCanvas' options={options} data={pieData} ref={chartRef}/>
    </div>)
}

export default PieChart