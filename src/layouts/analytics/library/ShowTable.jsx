import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import _ from 'lodash'
import { Button } from '@mui/material'

const ShowTable = ({ data }) => {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [pageSizeState, setPageSizeState] = useState()
  const [rowsPerPageState, setRowsPerPageState] = useState()
  const [title, setTitle] = useState()

  useEffect(() => {
    const { datasets, labels, ids, pagination, exportTitle } = data
    const { pageSize, rowsPerPageOptions, isPagination } = pagination
    setTitle(exportTitle.title)

    if (isPagination) {
      setPageSizeState(pageSize)
      setRowsPerPageState(rowsPerPageOptions)
    }

    //data grid column header create
    const tableHeader = [
      {
        field: _.first(ids),
        headerName: _.first(ids),
        width: 150,
      },
    ]
    datasets.map((colLabel) => {
      const colHeading = [
        {
          field: `${colLabel.label}`,
          headerName: `${colLabel.label}`,
          width: 150,
        },
      ]
      tableHeader.push(colHeading)
    })
    tableHeader[tableHeader.length - 1].push({
      field: 'total',
      headerName: 'Total',
      width: 150,
    })
    setColumns(_.flattenDepth(tableHeader, 1))

    const rows = labels.map((dataEntry, index) => {
      const rowEntry = { id: index }
      let total = 0
      _.map(datasets, (dataEntry) => {
        const { label, data } = dataEntry
        rowEntry[label] = data[index]
        total = total + data[index]
      })
      rowEntry[_.first(ids)] = dataEntry
      rowEntry['total'] = total
      return rowEntry
    })
    setRows(rows)
  }, [data])

  const exportPdf = () => {
    const doc = new jsPDF()
    doc.text(title, 20, 10)
    doc.autoTable({
      theme: 'grid',
      columns: columns.map((colValue) => {
        return { header: colValue.headerName, dataKey: colValue.field }
      }),
      body: rows,
    })
    doc.save('table.pdf')
  }
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: () => {
            return (
              <>
                <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
                  <GridToolbarExport />
                  <Button onClick={exportPdf}>Export PDF</Button>
                </GridToolbarContainer>
              </>
            )
          },
        }}
        pageSize={pageSizeState}
        rowsPerPageOptions={[rowsPerPageState]}
      />
    </Box>
  )
}
export default ShowTable
