import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Table, TableCell, TableHead, TableRow } from '@mui/material'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'

const DataPreview = ({ numberOfColumn, file, onFileSelect, setSelectedFile, setActiveStep }) => {
  const [fileName, setFileName] = useState('')
  const [tableData, setTableData] = useState([])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setSelectedFile = selectedFile
    if (selectedFile) {
      setFileName(selectedFile.name)
      setTableData(file)
      setActiveStep(2)
    }
  }

  const handleConfirm = () => {
    onFileSelect(file)
    setFileName('')
    setTableData([])
    setActiveStep(3)
    document.getElementById('file-upload').value = ''
  }

  const handleCancel = () => {
    setFileName('')
    setTableData([])

    document.getElementById('file-upload').value = ''
  }

  return (
    <Card sx={{ my: 3 }}>
      <MDBox display="flex" justifyContent="center">
        <MDBox sx={{ width: tableData.length !== 0 ? 'fit-content' : '60rem' }}>
          <MDBox display="flex" alignItems="center" justifyContent="space-between" my={2}>
            <MDBox display="flex" width="maxWidth" sx={{ width: '100%', marginRight: 5 }}>
              <MDTypography
                display="flex"
                variant="subtitle1"
                sx={{
                  border: '1px solid #ccc',
                  px: 2,
                  width: '100%',
                  borderRadius: 2,
                }}
              >
                {fileName ? fileName : 'Select File'}
              </MDTypography>
            </MDBox>
            <label htmlFor="file-upload">
              <MDButton variant="contained" color="info" ml={2} component="span">
                Upload
              </MDButton>
            </label>
            <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
          </MDBox>
          {tableData && tableData.length > 0 && (
            <MDBox display="flex" justifyContent="center" width="100%">
              <Table sx={{ width: 'fit-content' }}>
                <TableHead>
                  <TableRow>
                    {Object.keys(tableData[0])
                      .slice(0, numberOfColumn)
                      .map((column) => (
                        <TableCell key={column} sx={{ border: '1px solid #ccc', fontWeight: 'bold', px: 5 }}>
                          {column}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableHead>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      {Object.entries(row)
                        .slice(0, numberOfColumn)
                        .map(([key, value], idx) => (
                          <TableCell key={idx} sx={{ border: '1px solid #ccc', fontWeight: 400, px: 5 }}>
                            {value}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
                </TableHead>
              </Table>
            </MDBox>
          )}

          {tableData && tableData.length > 0 && (
            <MDBox display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
              <MDButton variant="contained" color="error" onClick={handleCancel} sx={{ mx: 2 }}>
                Cancel
              </MDButton>
              <MDButton variant="contained" color="success" onClick={handleConfirm}>
                Confirm
              </MDButton>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </Card>
  )
}

DataPreview.defaultProps = {
  numberOfColumn: 5,
}

DataPreview.propTypes = {
  numberOfColumn: PropTypes.number,
  fileName: PropTypes.string.isRequired,
  file: PropTypes.node.isRequired,

  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark']),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark', 'white']),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
}

export default DataPreview
