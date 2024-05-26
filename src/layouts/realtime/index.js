import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import MDBox from 'components/MDBox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Card, CardActionArea, CardHeader, FormControl, Icon, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { userDevicesSelector } from '../../store/device/slice/deviceSlice'
import { userSelector } from '../../store/user/slice/userSlice'
import { useNavigate } from 'react-router-dom'
import { getDevices } from '../../store/device/saga/deviceSaga'
import { getDeviceTemplates } from '../../store/device/saga/deviceTemplatesSaga'
import { getUser } from '../../store/user/saga/userSaga'
import _ from 'lodash'
import GaugeComponent from 'react-gauge-component'

const Realtime = () => {
  const [groupData, setGroupData] = useState([])
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const [showAllCharts, setShowAllCharts] = useState(true)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const { devices } = useSelector(userDevicesSelector)
  const { user } = useSelector(userSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if(user) {
      dispatch(getDevices())
      dispatch(getDeviceTemplates())
    } else {
      dispatch(getUser({ navigate }))
    }
  }, [user])
  useEffect(() => {
    const groups = []
    if(!_.isEmpty(devices)) {
      _.map(devices, device => {
        const charts = []
        _.map(_.keys(device.deviceInfo.extra), key => {
          charts.push({
            startValue: device.deviceInfo.extra[key].min * 1,
            lowerThreshold: device.deviceInfo.extra[key].tMin * 1,
            upperThreshold: device.deviceInfo.extra[key].tMax * 1,
            endValue: device.deviceInfo.extra[key].max * 1,
            currentValue: device.deviceState[key] * 1,
            unit: device.deviceInfo.extra[key].unit,
            label: device.deviceInfo.extra[key].name,
          })
        })
        groups.push({
          groupName: device.name,
          charts,
        })
      })
      setGroupData(groups)
    }
  }, [devices])

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
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant='outlined' sx={{ minWidth: '30%' }}>
              <Select
                value={showAllCharts ? 'all' : selectedGroupIndex}
                onChange={handleChangeGroup}
                onOpen={handleMenuOpen()}
                onClose={handleMenuClose()}
                IconComponent={() => (
                  <IconButton
                    size='large'
                    style={{ padding: 0, marginRight: '8px' }}
                    aria-label='open-menu'
                  >
                    <Icon>
                      {filterMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                    </Icon>
                  </IconButton>
                )}
              >
                <MenuItem value='all'>Select All</MenuItem>
                {groupData.map((group, index) => (
                  <MenuItem key={index} value={index}>
                    {group.groupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {(showAllCharts
              ? groupData.flatMap((group) => group.charts)
              : groupData[selectedGroupIndex].charts
          ).map((chartData, chartIndex) => (
            <Grid key={chartIndex} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card>
                <CardHeader
                  title={chartData.label}
                  sx={{alignSelf : 'center'}}
                />
                <MDBox
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                  }}
                >
                  <GaugeComponent
                    type='radial'
                    arc={{
                      width: 0.2,
                      padding: 0.005,
                      cornerRadius: 1,
                      // gradient: true,
                      subArcs: [
                        {
                          limit: chartData.lowerThreshold,
                          color: '#F5CD19',
                          showTick: true,
                          tooltip: {
                            text: 'Lower Threshold!',
                          },
                        },
                        {
                          limit: chartData.upperThreshold,
                          color: '#5BE12C',
                          showTick: true,
                          tooltip: {
                            text: 'Normal',
                          },
                        },
                        {
                          limit: chartData.upperThreshold+0.1,
                          color: '#EA4228',
                          showTick: true,
                          tooltip: {
                            text: 'High Threshold!',
                          },
                        },
                      ],
                    }}
                    pointer={{
                      color: '#b44a2e',
                      length: 0.80,
                      width: 15,
                      // elastic: true,
                    }}
                    labels={{
                      valueLabel: {
                        formatTextValue: value => value + ' ' + chartData.unit,
                        style: { marginTop : '-20px' , fontSize: '25px', fill: '#07461f' , textShadow: 'none' },
                      },
                      tickLabels: {
                        type: 'outer',
                        valueConfig: { formatTextValue: value => value + chartData.unit, fontSize: 10 },
                        ticks: [
                          { value: (chartData.endValue - chartData.startValue) / 3 },
                          { value: (chartData.endValue - chartData.startValue) * 2 / 3 },
                          { value: (chartData.endValue - chartData.startValue) * 3 / 3 },
                        ],
                      },
                    }}
                    value={chartData.currentValue}
                    minValue={chartData.startValue}
                    maxValue={chartData.endValue}
                  />
                </MDBox>
                <CardActionArea sx={{textAlign : 'center' , mb : 2 }}>
                  <Typography  variant={'caption'} >Last Updated: 6 Mins Ago</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}

export default Realtime
