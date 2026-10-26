import React from 'react'
import { Box, Grid, Icon, TableBody, Typography } from '@mui/material'
import MDBox from 'components/MDBox'

const LIGHTGRAY = '#E0E0E0'
const ORANGE = '#FFA726'
const GREEN = '#66BB6A'
const DARKGRAY = '#BDBDBD'

const stepperNoStyle = {
  fontSize: 'large',
  position: 'relative',
  left: '12px',
  top: '5px',
}
const stepperLabelStyle = {
  fontSize: 'small',
  position: 'relative',
  left: '-40px',
  top: '-25px',
  color: 'black',
}
const nodeStyle = {
  color: 'white',
  minHeight: '45px',
  minWidth: '45px',
  maxHeight: '45px',
  maxWidth: '45px',
  borderRadius: '50%',
  display: 'flex',
  padding: '5px',
  fontSize: '1rem',
  position: 'relative',
  top: '-27px',
  left: '-5px',
}
const containerStyle = {
  margin: 'auto',
  background: LIGHTGRAY,
  height: '2px',
  width: '60%',
}

const tableStyle = { width: '130%' }
const trStyle = { marginLeft: '10px' }
const tdStyle = { width: '25%', textAlign: 'left' }
const frameStyle = { width: '100%', my: 5 }

const Stepper = ({ steps, activeStep }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} xl={12}>
        <MDBox sx={frameStyle} display='flex' size='large'>
          <MDBox style={containerStyle}>
            <Box component='table' style={tableStyle}>
              <TableBody>
                <Box component='tr' style={trStyle}>
                  {steps.map(({ id, label, icon }, index) => (
                    <Box component='td' style={tdStyle} key={index}>
                      <MDBox
                        style={{
                          backgroundColor:
                            activeStep === index ? ORANGE : activeStep > index ? GREEN : DARKGRAY,
                          ...nodeStyle,
                        }}
                      >
                        {icon ? (
                          <Icon fontSize={'inherit'} color='inherit'>
                            {icon}
                          </Icon>
                        ) : (
                          <Typography style={stepperNoStyle}>{`${index + 1}`}</Typography>
                        )}
                      </MDBox>
                      <Typography style={stepperLabelStyle}>{label}</Typography>
                    </Box>
                  ))}
                </Box>
              </TableBody>
            </Box>
          </MDBox>
        </MDBox>
      </Grid>
    </Grid>
  )
}

export default Stepper
