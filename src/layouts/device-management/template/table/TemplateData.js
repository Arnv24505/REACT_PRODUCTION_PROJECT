import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { deleteDeviceTemplate } from '../../../../store/device/saga/deviceTemplatesSaga'
import { deviceTypes } from '../../constants'

const TemplateData = ({
  setSelectedTemplate,
  deviceTemplates,
}) => {
  const dispatch = useDispatch()
  const handleDelete = (templateId) => {
    dispatch(deleteDeviceTemplate({
      templateObject: { templateId }, onSuccess: (status) => {
        if(!status) alert('Error in Template')
      },
    }))
  }
  const rows = _.map(deviceTemplates, (data, index) => ({
    name: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {data.basic.templateName}
      </MDTypography>
    ),
    type: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {deviceTypes[data.basic.deviceType]}
      </MDTypography>
    ),
    action: (
      <MDBox gap={3}>
        <MDTypography
          key={'icon_1'}
          component='a'
          href='#'
          mx='1.5rem'
          color='text'
          onClick={() => { setSelectedTemplate(data) }}
        >
          <Icon>{'edit'}</Icon>
        </MDTypography>
        <MDTypography
          key={'icon_2'}
          component='a'
          href='#'
          mx='1.5rem'
          color='text'
          onClick={() => handleDelete(data.templateId)}
        >
          <Icon>{'delete'}</Icon>
        </MDTypography>
      </MDBox>
    ),

  }))

  const handleAction = (icon, data) => {
    // Implement your logic here based on the icon clicked
  }

  const columns = [
    { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
    { Header: 'type', accessor: 'type', align: 'left' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ]
  return (
    <MDBox>
      <DataTable
        table={{ columns, rows }}
        hideEntries={true}
        isSorted={false}
        entriesPerPage={20}
        showTotalEntries={true}
        noEndBorder
      />

    </MDBox>
  )
}
export default TemplateData