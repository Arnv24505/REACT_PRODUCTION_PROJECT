import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MDTypography from 'components/MDTypography';
import MenuList from '@mui/material/MenuList';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeviceCard from './DeviceCard';
import TextArea from './TextArea';
import MDButton from 'components/MDButton';
import { OutlinedInput } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Smartphone', 159, 6.0, 24, 4.0),
  createData('Laptop', 237, 9.0, 37, 4.3),
  createData('Smartwatch', 262, 16.0, 24, 6.0),
  createData('Tablet', 305, 3.7, 67, 4.3),
  createData('Desktop Computer', 356, 16.0, 49, 3.9),
];

const MapAttribute = ({ rowtableData, setdatapageShown, setSelectedFileSource, setDeviceshown, file, setActiveStep, onFileSelect, setSelectedFile, numberOfColumn }) => {
  const options = rowtableData.map(names => names.name);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [MQTToption, setMQTToption] = useState(false)
  const [HTTPPoption, setHTTPoption] = useState(false)
  const [rowSetter, setRow] = useState(false);
  const [ruleTypeMenuOpen, setRuleTypeMenuOpen] = useState(false)
  const [deviceTypeMenuOpen, setDeviceTypeMenuOpen] = useState(false)
  const [DeviceCardshown, setDeviceshown2] = useState(false)
  const [showTextjson, setshowTextjson] = useState(false)
  const [selectedName, setSelectedName] = useState('');

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };
  const handleButton = () => {
    onFileSelect(file)
    setActiveStep(2)
    setshowTextjson(true)
  }
  useEffect(() => {
    console.log("row data >>>>>>>>>>", rowtableData)
  }, [])

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      height: "6vh",
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#ccc',
      },
    },
  }));
  const handleMenuOpen = (menu) => () => {
    if (menu === 'type') setDeviceTypeMenuOpen(true)
    else if (menu === 'ruleTypes') setRuleTypeMenuOpen(true)
    else if (menu === 'value') setValueMenuOpen(true)
    else if (menu === 'conditionOperator') setConditionMenuOpen(true)
    else if (menu === 'endpoint') setEndpointMenuOpen(true)
    else if (menu === 'operation') setOperationMenuOpen(true)
  }

  const handleMenuClose = (menu) => () => {
    if (menu === 'type') setDeviceTypeMenuOpen(false)
    else if (menu === 'ruleTypes') setRuleTypeMenuOpen(false)
    else if (menu === 'value') setValueMenuOpen(false)
    else if (menu === 'conditionOperator') setConditionMenuOpen(false)
    else if (menu === 'endpoint') setEndpointMenuOpen(false)
    else if (menu === 'operation') setOperationMenuOpen(false)
  }

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  useEffect(() => {
  }, [selectedName])
  const handleMenuItemClick = (e) => {
    setDeviceshown2(true)
    const { value } = e.target
    setSelectedName(value);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleSelect = (event) => {
    const { value } = event.target
    setSelectedName(value);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const [tableData, setTableData] = useState([])
  const handlebackButton = () => {
    setDeviceshown(false)
    setSelectedFileSource(false)
    setdatapageShown(false)
    setActiveStep(0)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {
        showTextjson ? <TextArea file={file} setActiveStep={setActiveStep} onFileSelect={onFileSelect} setshowTextjson={setshowTextjson} /> : <Container style={{ display: "block" }}>
          <Box
            sx={{
              bgcolor: '#fff',
              color: '#000',
              height: '160vh',
              position: "relative",
              display: "grid",
              gridTemplateRows: rowSetter || !DeviceCardshown ? "21vh 10vh 46vh auto" : "14vh 52vh 13vh 48vh",
              gridAutoRows: "minmax(10vh,auto)",
              justifyContent: "center",
              gap: "1rem",
              gridRow: "1"
            }}
          >
            <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center" }}>
              <FormControl variant='standard' sx={{ py: 1, minWidth: '20', marginTop: "5vh", width: "26vw" }}>
                <InputLabel id='deviceType-select-label'>Select Device</InputLabel>
                <Select
                  labelId='deviceType-select-label'
                  name='deviceType'
                  label='Device Type'
                  value={selectedName}
                  open={deviceTypeMenuOpen}
                  onChange={(e) => { handleMenuItemClick(e) }}
                  onOpen={handleMenuOpen('type')}
                  onClose={handleMenuClose('type')}
                  IconComponent={() => (
                    <IconButton
                      open={deviceTypeMenuOpen}
                      size='large'
                      style={{ padding: 0, marginRight: '8px' }}
                      aria-label='open-menu'
                    >
                      <Icon onOpen={deviceTypeMenuOpen} onClose={handleMenuClose('type')}>
                        {deviceTypeMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                      </Icon>
                    </IconButton>
                  )}
                >
                  {options.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>

                  ))}
                </Select>
              </FormControl>
            </Container>
            {
              DeviceCardshown ? <DeviceCard selectedName={selectedName} /> : null
            }
            <Container style={{ height: "5rem", display: "flex", justifyContent: "center" }}>
              <Box sx={{
                bgcolor: '#fff',
                height: "5rem",
                rowGap: "2rem",
                display: "flex",
                justifyContent: "center"
              }}
                style={{ width: "35vw" }} >
                <InputLabel id="demo-customized-select-label"></InputLabel>
                <TextField id="standard-basic" style={{ width: "22vw" }} label="Collection Period" placeholder='0-99' variant="standard" />
                <FormControl variant="standard" sx={{ m: 1 ,margin:"1px"}}>
                  <InputLabel id="demo-simple-select-standard-label">Units</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    IconComponent={() => (
                      <IconButton size="small">
                        <ArrowDropDownIcon />
                      </IconButton>
                    )}
                  >
                    <MenuItem >
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>sec</MenuItem>
                    <MenuItem value={20}>min</MenuItem>
                    <MenuItem value={30}>hr</MenuItem>
                  </Select>
                </FormControl>

              </Box>
            </Container>
            <Container maxWidth="sm" >
              <Box sx={{ bgcolor: '#fff', height: '30vh' }} >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 250, width: "40vw", marginBottom: "5rem" }} aria-label="simple table">
                    <TableHead style={{ display: "table-header-group" }}>
                      <TableRow >
                        <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}>
                          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
                            Property Name
                          </MDTypography>
                        </TableCell>
                        <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }} align="right" ><MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
                          Value
                        </MDTypography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}>
                            <MDTypography variant="caption" color="secondary">
                              {row.name}
                            </MDTypography>
                          </TableCell>
                          <TableCell style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }} align="right"><MDTypography variant="caption" color="secondary">
                            {row.calories}
                          </MDTypography></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Container>
            <Container style={{ display: "flex", justifyContent: "center" }}>
              <MDButton variant="contained" onClick={() => { handlebackButton() }} color='info' style={{ height: "1rem", marginTop: "3vh", marginRight: "2rem" }}>
                Back
              </MDButton>
              <MDButton variant="contained" onClick={() => { handleButton() }} color="info" style={{ height: "1rem", marginTop: "3vh", marginRight: "2rem" }}>
                Next
              </MDButton>
            </Container>
          </Box>
        </Container>
      }


    </React.Fragment>
  )
}

export default MapAttribute
