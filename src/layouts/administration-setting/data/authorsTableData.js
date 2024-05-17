/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 * =========================================================
 * * Material Dashboard 2 React - v2.2.0
 * =========================================================
 * Product Page: https://www.quarkifi.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.quarkifi.com)
 * Coded by www.quarkifi.com
 * =========================================================
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDAvatar from 'components/MDAvatar'

// Images
import team2 from 'assets/images/team-2.jpg'
import team3 from 'assets/images/team-3.jpg'
import team4 from 'assets/images/team-4.jpg'
import { Avatar, Tooltip } from '@mui/material'

export default function data () {
  const RowData = [
    {
      user: { image: team2, name: 'John Michael', email: 'john@quarkifi.com' },
      job: { title: 'Manager', description: 'Organization' },
      status: 'Active',
      employed: { date: '23/04/18' },
    },
    {
      user: { image: team3, name: 'Alexa Liras', email: 'alexa@quarkifi.com' },
      job: { title: 'Programator', description: 'Developer' },
      status: 'Inactive',
      employed: { date: '11/01/19' },
    },
    {
      user: { image: team4, name: 'Laurent Perrier', email: 'laurent@quarkifi.com' },
      job: { title: 'Executive', description: 'Projects' },
      status: 'Active',
      employed: { date: '19/09/17' },
    },
    {
      user: { image: team3, name: 'Michael Levi', email: 'michael@quarkifi.com' },
      job: { title: 'Programator', description: 'Developer' },
      status: 'Active',
      employed: { date: '24/12/08' },
    },
    {
      user: { image: team3, name: 'Richard Gran', email: 'richard@quarkifi.com' },
      job: { title: 'Manager', description: 'Executive' },
      status: 'Inactive',
      employed: { date: '04/10/21' },
    },
    {
      user: { image: team4, name: 'Miriam Eric', email: 'miriam@quarkifi.com' },
      job: { title: 'Programator', description: 'Developer' },
      status: 'Inactive',
      employed: { date: '14/09/20' },
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Inactive':
        return '#FF0000'
      case 'Active':
        return '#4CAF50'
      default:
        return 'grey'
    }
  }

  const User = ({ image, name, email }) => (
    <MDBox display='flex' alignItems='center' lineHeight={1}>
      <MDAvatar src={image} name={name} size='sm' />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display='block' variant='button' fontWeight='medium'>
          {name}
        </MDTypography>
        <MDTypography variant='caption'>{email}</MDTypography>
      </MDBox>
    </MDBox>
  )

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign='left'>
      <MDTypography display='block' variant='caption' color='text' fontWeight='medium'>
        {title}
      </MDTypography>
      <MDTypography variant='caption'>{description}</MDTypography>
    </MDBox>
  )

  const createRowComponent = (rowData) => ({
    user: <User {...rowData.user} />,
    function: <Job {...rowData.job} />,
    status: (
      <Tooltip title={rowData.status}>
        <Avatar sx={{ bgcolor: getStatusColor(rowData.status), height: '10px', width: '10px' }}> </Avatar>
      </Tooltip>
    ),
    employed: (
      <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
        {rowData.employed.date}
      </MDTypography>
    ),
    action: (
      <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
        Edit
      </MDTypography>
    ),
  })

  const rows = RowData.map(createRowComponent)

  return {
    columns: [
      { Header: 'user', accessor: 'user', width: '45%', align: 'left' },
      { Header: 'function', accessor: 'function', align: 'left' },
      { Header: 'status', accessor: 'status', align: 'center' },
      { Header: 'employed', accessor: 'employed', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],

    rows: rows,
  }
}
