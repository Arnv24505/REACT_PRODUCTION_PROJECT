import { useState } from 'react'
import Grid from '@mui/material/Grid'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import MDBox from 'components/MDBox'
import RadialBarChart from './components/Charts/RadialChart'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Card, FormControl, Icon, IconButton } from '@mui/material'

const Realtime = () => {
  const dummyChartDataArray = [
    {
      groupName: 'Group 1',
      charts: [
        {
          startValue: 0,
          upperThreshold: 90,
          endValue: 100,
          currentValue: 70,
          label: 'Chart 1',
        },
        {
          startValue: 0,
          lowerThreshold: 10,
          upperThreshold: 120,
          endValue: 135,
          currentValue: 11,
          label: 'Chart 2',
        },
      ],
    },
    {
      groupName: 'Group 2',
      charts: [
        {
          startValue: 0,
          upperThreshold: 180,
          endValue: 200,
          currentValue: 100,
          label: 'Chart 3',
        },
        {
          startValue: 0,
          lowerThreshold: 10,
          upperThreshold: 100,
          endValue: 120,
          currentValue: 10,
          label: 'Chart 4',
        },
        {
          startValue: 0,
          lowerThreshold: 10,
          endValue: 180,
          currentValue: 90,
          label: 'Chart 5',
        },
        {
          startValue: 0,
          lowerThreshold: 10,
          upperThreshold: 150,
          endValue: 180,
          currentValue: 150,
          label: 'Chart 6',
        },
        {
          startValue: 0,
          lowerThreshold: 10,
          upperThreshold: 160,
          endValue: 180,
          currentValue: 90,
          label: 'Chart 5',
        },
        {
          startValue: 0,
          lowerThreshold: 10,
          upperThreshold: 140,
          endValue: 180,
          currentValue: 90,
          label: 'Chart 6',
        },
      ],
    },
    // Add more groups as needed
  ]

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const [showAllCharts, setShowAllCharts] = useState(true)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)

  const handleChangeGroup = (event) => {
    const selectedIndex = event.target.value
    if(selectedIndex === 'all') {
      setShowAllCharts(true)
    } else {
      setShowAllCharts(false)
      setSelectedGroupIndex(selectedIndex)
    }
  }

  const handleMenuOpen = () => () => {
    setFilterMenuOpen(true)
  }

  const handleMenuClose = () => () => {
    setFilterMenuOpen(false)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={ 3 }>
        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 }>
            <FormControl variant='outlined' sx={ { minWidth: '30%' } }>
              <Select
                value={ showAllCharts ? 'all' : selectedGroupIndex }
                onChange={ handleChangeGroup }
                onOpen={ handleMenuOpen() }
                onClose={ handleMenuClose() }
                IconComponent={ () => (
                  <IconButton
                    size='large'
                    style={ { padding: 0, marginRight: '8px' } }
                    aria-label='open-menu'
                  >
                    <Icon>
                      { filterMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down' }
                    </Icon>
                  </IconButton>
                ) }
              >
                <MenuItem value='all'>Select All</MenuItem>
                { dummyChartDataArray.map((group, index) => (
                  <MenuItem key={ index } value={ index }>
                    { group.groupName }
                  </MenuItem>
                )) }
              </Select>
            </FormControl>
          </Grid>
          { (showAllCharts
            ? dummyChartDataArray.flatMap((group) => group.charts)
            : dummyChartDataArray[selectedGroupIndex].charts
          ).map((chartData, chartIndex) => (
            <Grid key={ chartIndex } item xs={ 12 } sm={ 6 } md={ 4 } lg={ 4 } xl={ 3 }>
              <Card>
                <MDBox
                  sx={ {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                  } }
                >
                  <RadialBarChart
                    startValue={ chartData.startValue }
                    endValue={ chartData.endValue }
                    currentValue={ chartData.currentValue }
                    label={ chartData.label }
                    upperThreshold={ chartData.upperThreshold }
                    lowerThreshold={ chartData.lowerThreshold }
                  />
                </MDBox>
              </Card>
            </Grid>
          )) }
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}

export default Realtime
