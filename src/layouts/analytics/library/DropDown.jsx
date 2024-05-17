import React, { useEffect, useState } from 'react'
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import LineChart from './LineChart'
import MDBox from 'components/MDBox'

const DropDown = ({ data }) => {
  const [filterData, setFilterData] = useState({
    datasets: [],
    labels: [],
    ids: [],
    pagination: {},
    exportTitle: {},
  })
  const [selectedLabels, setSelectedLabels] = useState([])
  const [options, setOptions] = useState([])
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)

  const handleMenuOpen = () => () => {
    setFilterMenuOpen(true)
  }

  const handleMenuClose = () => () => {
    setFilterMenuOpen(false)
  }

  // selected label and datasets label match pass forward
  useEffect(() => {
    const options = data.datasets.map((option, index) => {
      const { label } = option
      return <MenuItem key={index} value={label}>{label}</MenuItem>
    })
    setOptions(options)
  }, [data])

  // current selected labels
  const handleSelectedLabels = (event) => {
    const selectedValues = event.target.value

    setSelectedLabels(selectedValues)

    const filteredData = {
      datasets: data.datasets.filter((dataset) => selectedValues.includes(dataset.label)),
      labels: data.labels,
      ids: data.ids,
      pagination: data.pagination,
      exportTitle: data.exportTitle,
    }

    setFilterData(filteredData)
  }

  return (
    <MDBox>
      <MDBox data-testid='my-select-component' mb={2}>
        <FormControl variant='outlined' sx={{ width: '60%' }}>
          <InputLabel sx={{ textAlign: 'center', mt: -0.5 }}>Select an option</InputLabel>
          <Select
            id='canvas'
            name='myOptions'
            value={selectedLabels}
            label='Select an option'
            onChange={handleSelectedLabels}
            onOpen={handleMenuOpen()}
            onClose={handleMenuClose()}
            IconComponent={() => (
              <IconButton
                size='large'
                style={{ padding: 0, marginRight: '8px' }}
                aria-label='open-menu'
              >
                <Icon>{filterMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
              </IconButton>
            )}
            multiple
          >
            {options}
          </Select>
        </FormControl>
      </MDBox>
      {filterData.datasets.length > 0 && <LineChart data={filterData} />}
    </MDBox>
  )
}

export default DropDown


