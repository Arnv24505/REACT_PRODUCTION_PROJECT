import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import MDBox from 'components/MDBox'

const RadialBarChart = ({
  startValue,
  lowerThreshold = 0,
  upperThreshold,
  endValue,
  currentValue,
  label,
}) => {
  const chartRef = useRef(null)

  const axisLineGradientMin = new echarts.graphic.LinearGradient(0.2, 0.6, 0.25, 0.1, [
    { offset: 0, color: '#fd666d' },
    { offset: 0.5, color: '#FFA500' },
    { offset: 1, color: '#4CBB17' },
  ])
  const axisLineGradientMax = new echarts.graphic.LinearGradient(0.9, 0.8, 0.75, 0.3, [
    { offset: 0, color: '#fd666d' },
    { offset: 0.5, color: '#FFA500' },
    { offset: 1, color: '#4CBB17' },
  ])

  useEffect(() => {
    const chart = echarts.init(chartRef.current)

    const option = {
      series: [
        {
          type: 'gauge',
          min: startValue,
          max: endValue,
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [lowerThreshold / endValue, '#fd666d'],
                [(lowerThreshold / endValue) + 0.1, axisLineGradientMin],
                [((upperThreshold || endValue) / endValue - 0.1), '#4CBB17'],
                [(upperThreshold || endValue) / endValue, axisLineGradientMax],
                [1, '#fd666d'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            show: false,
            distance: -30,
            length: 5,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            show: false,
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4,
            },
          },
          axisLabel: {
            show: true,
            color: 'inherit',
            distance: -25,
            fontSize: 12,
            formatter: (value) => Math.round(value),
          },
          detail: {
            valueAnimation: true,
            formatter: `{value}\n${label}`,
            color: 'inherit',
            fontSize: 18,
            offsetCenter: [0, '60%'],
          },
          data: [
            {
              value: currentValue,
            },
          ],
        },
      ],
    }

    chart.setOption(option)

    return () => {
      chart.dispose() // Dispose the chart when the component is unmounted
    }
  }, [startValue, lowerThreshold, upperThreshold, endValue, currentValue, label, axisLineGradientMin])

  const handleSliderChange = (setter) => (event, value) => {
    event.stopPropagation()
    setter(value)
  }

  return (
    <MDBox width={300} height={400} mt={0}>
      <MDBox mt={2} width={300} height={300}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </MDBox>

    </MDBox>
  )
}

export default RadialBarChart
