import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const Snackbaraler = ({ snackbarShow, setSnackbarShow }) => {
  const handleClose = () => {
    setSnackbarShow(false)
  }
  return (
    <div>
      <Snackbar open={snackbarShow} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%', color: '#fff' }}>
          Successfully Connected With Database
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Snackbaraler
