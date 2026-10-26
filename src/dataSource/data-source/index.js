import * as React from 'react'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import DocSource from './components/DocSource'
import DataPreview from './components/DataPreview'
import DummyData from './components/DataPreview/dummyData.json'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Stepper from './components/OrdersOverview/Stepper'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import MapAttribute from './components/MapAttribute/MapAttribute'
import Databasepage from './components/DataPreview/Database/Databasepage'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

const Cover = () => {
  const [selectedFileSource, setSelectedFileSource] = useState('')
  const [selectedFileData, setSelectedFileData] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [personName, setPersonName] = React.useState([])
  const [deviceShown, setDeviceshown] = useState(false)
  const [datapageShown, setdatapageShown] = useState(false)

  const theme = useTheme()
  const handleConfirm = (file) => {
    setSelectedFileData(file)
    setSelectedFileSource('')
  }

  const steps = [
    {
      id: 'selectDocType',
      label: 'Select Source',
    },
    {
      id: 'selectSections',
      label: 'Map Attribute',
    },
    {
      id: 'review',
      label: 'Schema',
    },
    {
      id: 'savePublish',
      label: 'Save / Publish ',
    },
  ]

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Stepper steps={steps} activeStep={activeStep} />
      {!selectedFileSource && !deviceShown && !datapageShown && (
        <DocSource
          setDeviceshown={setDeviceshown}
          setdatapageShow={setdatapageShown}
          setSelectedFile={setSelectedFileSource}
          setActiveStep={setActiveStep}
        />
      )}

      {selectedFileSource && (
        <DataPreview
          fileName={'Dummy data'}
          file={DummyData}
          onFileSelect={handleConfirm}
          setDeviceshown={setDeviceshown}
          setSelectedFile={setSelectedFile}
          setActiveStep={setActiveStep}
        />
      )}
      {deviceShown && !selectedFileSource && !datapageShown && (
        <MapAttribute
          setActiveStep={setActiveStep}
          file={DummyData}
          onFileSelect={handleConfirm}
          setDeviceshown={setDeviceshown}
          setSelectedFile={setSelectedFile}
          setSelectedFileSource={setSelectedFileSource}
          setdatapageShown={setdatapageShown}
          rowtableData={[]}
        />
      )}

      {datapageShown && !selectedFileSource && !deviceShown && (
        <Databasepage
          setActiveStep={setActiveStep}
          setDeviceshown={setDeviceshown}
          setdatapageShown={setdatapageShown}
        />
      )}
    </DashboardLayout>
  )
}

export default Cover
