import React from 'react'
import Box from '@mui/material/Box'
import MDTypography from 'components/MDTypography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const DeviceCard = ({ selectedName }) => {
  const isMQTT = selectedName === 'Vasu' || selectedName === 'Rahul'
  const isHTTP = selectedName === 'Yogesh' || selectedName === 'Priya' || selectedName === 'Neha'

  function createHTTPData (Username, hostname, Password) {
    return { Username, hostname, Password }
  }

  function createMQTTData (Username, hostname, Password) {
    return { Username, hostname, Password }
  }

  const MQTTrows = [
    createMQTTData('Username', 24, selectedName),
    createMQTTData('Password', 37, '%$#$@#'),
    createMQTTData('MQTT Host', 16., 'mqtt.example.com'),
    createMQTTData('Downstream Path', 16., '/data/downstream'),
    createMQTTData('Upstream Path', 16., '/data/upstream'),

  ]
  const HTPPSrows = [
    createHTTPData('Username', 24, selectedName),
    createHTTPData('Hostname', 37, 'HTTPS'),
    createHTTPData('Password', 16., '@##sdss', ''),

  ]

  return (
    <Box sx={{
      minWidth: 275,
      marginBottom: '3rem',
      height: '25vh',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>

      <MDTypography variant='caption' color='secondary'>
        {isMQTT ? <MDTypography variant='h6'>MQTT</MDTypography> : isHTTP ? <MDTypography
          variant='h6'>HTTP</MDTypography> : null}</MDTypography>
      {isMQTT && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250, width: '40vw', marginBottom: '5rem' }} aria-label='simple table'>
          <TableHead style={{ display: 'table-header-group' }}>
            <TableRow>
              <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}>
                <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
                  Property Name
                </MDTypography>
              </TableCell>
              <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }} align='right'><MDTypography
                component='a' href='#' variant='caption' color='text' fontWeight='medium'>
                Value
              </MDTypography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MQTTrows.map((row) => (
              <TableRow
                key={row.Username}
                style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'
                           style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}>
                  <MDTypography variant='caption' color='secondary'>
                    {row.Username}
                  </MDTypography>

                </TableCell>
                <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}
                           align='right'><MDTypography variant='caption' color='secondary'>
                  {row.Password}
                </MDTypography></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {isHTTP && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250, width: '40vw', marginBottom: '5rem' }} aria-label='simple table'>
          <TableHead style={{ display: 'table-header-group' }}>
            <TableRow>
              <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}>
                <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
                  Property Name
                </MDTypography>
              </TableCell>
              <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }} align='right'><MDTypography
                component='a' href='#' variant='caption' color='text' fontWeight='medium'>
                Value
              </MDTypography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {HTPPSrows.map((row) => (
              <TableRow
                key={row.Username}
                style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'
                           style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}>
                  <MDTypography variant='caption' color='secondary'>
                    {row.Username}
                  </MDTypography>

                </TableCell>
                <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}
                           align='right'><MDTypography variant='caption' color='secondary'>
                  {row.Password}
                </MDTypography></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Box>
  )
}

export default DeviceCard
