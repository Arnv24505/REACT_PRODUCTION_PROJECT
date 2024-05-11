import { useState } from 'react'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import DocSource from './components/DocSource'
import DataPreview from './components/DataPreview'
import DummyData from './components/DataPreview/dummyData.json'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Stepper from './components/OrdersOverview/Stepper'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MapAttribute from './components/MapAttribute/MapAttribute';
import Databasepage from './components/DataPreview/Database/Databasepage';
import tableData from 'layouts/device-management/data/tableData'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Cover = () => {
  const [selectedFileSource, setSelectedFileSource] = useState('')
  const [selectedFileData, setSelectedFileData] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [activeStep, setActiveStep] = useState(0)

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
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [deviceShown,setDeviceshown] = useState(false)
  const [datapageShown,setdatapageShown] = useState(false);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <Stepper  steps={steps} activeStep={activeStep} />
      {!selectedFileSource && !deviceShown && !datapageShown && (
        <DocSource setDeviceshown={setDeviceshown} setdatapageShow={setdatapageShown} setSelectedFile={setSelectedFileSource} setActiveStep={setActiveStep} />
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
      {deviceShown && !selectedFileSource && !datapageShown &&
        (
        <MapAttribute setActiveStep={setActiveStep}
         file={DummyData}
         onFileSelect={handleConfirm}
         setDeviceshown={setDeviceshown}
          setSelectedFile={setSelectedFile}
          setSelectedFileSource={setSelectedFileSource}
          setdatapageShown={setdatapageShown}
          rowtableData = {tableData}
         />
      )
      }

      {
        datapageShown && !selectedFileSource && !deviceShown && (
          <Databasepage setActiveStep={setActiveStep}
setDeviceshown={setDeviceshown}
setdatapageShown={setdatapageShown}
          />
        )
      }



    </DashboardLayout>
  )
}

export default Cover
