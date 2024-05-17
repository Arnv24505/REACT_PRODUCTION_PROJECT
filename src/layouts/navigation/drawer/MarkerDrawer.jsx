import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Box, Drawer, FormControl, InputLabel, TextField, Typography } from '@mui/material'

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '100%',
  height: '100%',
}

const MarkerDrawer = (props) => {
  const [markObj, setMarkObject] = useState([])
  useEffect(() => {
    setMarkObject([props.markData])
  }, [props.markData])

  return (
    <div>
      <Drawer anchor='right' open={props.drawerOpen} onClose={props.drawerClose}>
        <Box p={2} width='250px' textAlign='center' role='presentation'>
          <Typography variant='h6' component='div'>
            Marker Content
          </Typography>
          <Box sx={{ ...commonStyles, border: 1 }}>
            {_.map(markObj, (markData) => {
              return _.map(Object.keys(markData), (keyValue, index) => {
                return (
                  <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor='my-input' sx={{ ml: -5, mt: -2 }}>
                      {keyValue}:
                    </InputLabel>
                    <TextField
                      sx={{ ml: 3, width: 190, mr: -3 }}
                      disabled
                      id='outlined-disabled'
                      defaultValue={Object.values(markData)[index]}
                    />
                  </FormControl>
                )
              })
            })}
          </Box>
        </Box>
      </Drawer>
    </div>
  )
}

export default MarkerDrawer
