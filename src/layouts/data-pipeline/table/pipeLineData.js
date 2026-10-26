import React from 'react'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import _ from 'lodash'

const PipeData = ({ setSelectedData,  }) => {
  const rows = [
    {
      name: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          PipeLine name
        </MDTypography>
      ),
      deviceTemplate: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          121
        </MDTypography>
      ),

      action: (
        <MDBox gap={3}>
          <MDTypography
            key={'icon_1'}
            component="a"
            href="#"
            mx="1.5rem"
            color="text"
            onClick={() => {
              setSelectedData(true)
            }}
          >
            <Icon>{'edit'}</Icon>
          </MDTypography>
          <MDTypography key={'icon_2'} component="a" href="#" mx="1.5rem" color="text">
            <Icon>{'delete'}</Icon>
          </MDTypography>
        </MDBox>
      ),
    },
  ]

  const columns = [
    { Header: 'Pipe name', accessor: 'name', width: '30%', align: 'left' },
    { Header: 'device template', accessor: 'status', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ]

  return (
    <>
      <MDBox>
        <DataTable
          hideEntries={true}
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={20}
          showTotalEntries={true}
          noEndBorder
        />
      </MDBox>
    </>
  )
}

export default PipeData
