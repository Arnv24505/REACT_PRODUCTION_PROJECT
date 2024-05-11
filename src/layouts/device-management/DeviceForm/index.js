import React, { useEffect, useState } from 'react'
import { Box, Card, Grid, Icon, IconButton, createTheme } from '@mui/material'
import MDInput from 'components/MDInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import MDButton from 'components/MDButton'
import { v4 as uuidv4 } from 'uuid'
import FormHelperText from '@mui/material/FormHelperText';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Form } from 'react-router-dom'
import { valid } from 'chroma-js'
import { number, object } from 'prop-types'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MDTypography from 'components/MDTypography'
import { initialState, userRowSlicedata } from '../DeviceRedux/DeviceSlice/DeviceSlice'
import { useDispatch, useSelector } from 'react-redux'
import mainFuntionSaga, { addDevice, updateDevice } from '../DeviceRedux/DeviceSaga/DeviceSaga'
import {
  selectDeviceInfoMax,
  selectDeviceInfoMin,
  selectDeviceInfoTMax,
  selectDeviceInfoTMin,
  selectDeviceInfoUnit,
  selectDeviceLocation,
  selectName,
  selectMQTThost,
  selectMQTTupstreampath
  , selectMQTTdownstreampath,
  selectMQTTusername,
  selectMQTTpassword,
  selectHTTPSbasicAuthusername,
  selectHTTPSbasicAuthPassword,
  userRowdata
} from '../DeviceRedux/DeviceSelectors/DeviceSelectors'
import { ValidationError } from 'yup'
import { nanoid } from 'nanoid'
import { Data } from '@react-google-maps/api'
import { unstable_resetCleanupTracking } from '@mui/x-data-grid'

const DeviceForm = ({ isUpdate, mainUsername,
  mainData,
  rowData, valueUpdation, newname, newtype, types, locations, setSubmitData, isFormVisible, setIsFormVisible, handleAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    connectionOption: '',
  })

  const [advanceOptionVisible, setAdvanceOptionVisible] = useState(false)
  const [typeMenuOpen, setTypeMenuOpen] = useState(false)
  const [locationMenuOpen, setLocationMenuOpen] = useState(false)
  const [error, setErrors] = useState({})
  const [connectionOptionEnable, setconnectionOptionEnable] = useState(false);
  const [submitColor, setSubmitColor] = useState('secondary');
  const [count, setCount] = useState(0);
  const [typeEnabled, settypeEnabled] = useState(false);
  const [randomeText, setrandomText] = useState("random text");
  const [randometextEnable, setrandomTextEnable] = useState(false);
  const [typeoptionHider, settypeoptionHider] = useState(false);
  const [connectionText, setconnectionText] = useState("");
  const [MQTToption, setMQTToption] = useState(false);
  const [HTTPSoption, setHTTPSoption] = useState(false);
  const [locationIconEnable, setlocationIconEnable] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [snackbarEnable, setSnackbarEnable] = useState(false)
  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const dispatch = useDispatch()

  const updateSubmitButtonColor = () => {
    // if (checkFormValidity()) {
    // } else {
    //   setSubmitColor('secondary');
    // }
    setSubmitColor('success');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Remove the error message for the corresponding field
    setErrors({
      ...error,
      [name]: undefined,
    });

    if (name === 'connection') {
      // Update both connectionOption and connectionText
      setFormData({
        ...formData,
        connectionOption: value,
      });
      setconnectionText(value);
    } else {
      // For other fields, update the form data as usual
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Update submit button color based on form validity
    updateSubmitButtonColor();
  };





  const handleMenuOpen = (menu) => () => {
    if (menu === 'type') setTypeMenuOpen(true)
    else if (menu === 'location') setLocationMenuOpen(true)
    else if (menu === 'connection') setconnectionOptionEnable(true)
  }

  const handleMenuClose = (menu) => () => {
    if (menu === 'type') setTypeMenuOpen(false)
    else if (menu === 'location') setLocationMenuOpen(false)
    else if (menu === 'connection') setconnectionOptionEnable()
  }


  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  function createDevice(deviceName, deviceUnit, deviceMax, deviceMin, deviceTmax, deviceTmin) {
    return {
      devicename: deviceName,
      unit: deviceUnit,
      max: deviceMax,
      min: deviceMin,
      tmax: deviceTmax,
      tmin: deviceTmin
    };
  }

  const handleAddmain = (updateobj, addedobj) => {
    setCount(count + 1);
    let deviceName = valueUpdation ? updateobj.mainName : addedobj.mainName;
    let deviceUnit = valueUpdation ? updateobj.deviceUnit : addedobj.deviceUnit
    let deviceMax = valueUpdation ? updateobj.deviceMax : addedobj.deviceMax
    let deviceMin = valueUpdation ? updateobj.deviceMin : addedobj.deviceMin
    let deviceTmax = valueUpdation ? updateobj.deviceTmax : addedobj.deviceTmax
    let deviceTmin = valueUpdation ? updateobj.deviceTmin : addedobj.deviceTmin
    let newDevice = createDevice(deviceName, deviceUnit, deviceMax, deviceMin, deviceTmax, deviceTmin);
    valueUpdation ? connectionInfoObj.push(newDevice) : updatedconnectionInfoObj.push(newDevice)
  };

  const handleRemove = () => {
    if (count > 0) {
      setCount(count - 1); 
    }
  };

  const handleTypeoption = () => {
    settypeEnabled(true);
  }

  const renderTextFields = () => {
    let textFields = [];
    for (let i = 0; i < count; i++) {
      textFields.push(
        <CardContent style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr)) auto auto", gap: "2vw 3vw", width: "73.4vw" }}>
          <TextField
            required
            value={valueUpdation ? updatedName : deviceName}
            style={{ fontSize: "1rem" }}
            id="outlined-required"
            onChange={(e) => {
              valueUpdation ? handleUpdatedName(e.target.value) : handleNamechange(e.target.value)
            }}
            label="Name"
          />
          <FormControl sx={{ m: 1, minWidth: 120, height: "2.8rem", margin: 0 }}>
            <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
            <Select
              sx={{ height: "3rem", color: "#000" }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"

              label="Age"
              value={valueUpdation ? updatedUnit : deviceUnit}
              onChange={(e) => { valueUpdation ? handleUpdatedUnit(e.target.value) : handledeviceUnitchange(e.target.value) }}
            >
              <MenuItem value={10}>celcius</MenuItem>
              <MenuItem value={20}>Fahrenheit</MenuItem>
              <MenuItem value={30}>other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            style={{ fontSize: "1rem" }}
            id="outlined-required"
            label="Max value"
            value={valueUpdation ? updatedMax : deviceMax}
            onChange={(e) => { valueUpdation ? handleUpdatedMax(e.target.value) : handledeviceMaxchange(e.target.value) }}
            defaultValue="Hello World"
          />
          <TextField
            required
            style={{ fontSize: "1rem" }}
            id="outlined-required"
            label="Min value"
            value={valueUpdation ? updatedMin : deviceMin}
            onChange={(e) => { valueUpdation ? handleUpdatedMin(e.target.value) : handledeviceMinchange(e.target.value) }}
            defaultValue="Hello World"
          />
          <TextField
            required
            style={{ fontSize: "1rem" }}
            id="outlined-required"
            value={valueUpdation ? updatedTMin : deviceTmin}
            label="Threshold min"
            onChange={(e) => { valueUpdation ? handleUpdatedTMin(e.target.value) : handlethresholdminchange(e.target.value) }}
            defaultValue="Hello World"
          />
          <TextField
            required
            style={{ fontSize: "1rem" }}
            id="outlined-required"
            value={valueUpdation ? updatedTMax : deviceTmax}
            onChange={(e) => { valueUpdation ? handleUpdatedTMax(e.target.value) : handlethresholdmaxchange(e.target.value) }}
            label="Threshold max"
            defaultValue="Hello World"
          />
          <Button variant="contained" style={{ borderRadius: "30px", justifySelf: "end", position: "absolute" }} onClick={() => { handleRemove() }}><RemoveIcon style={{ color: "#fff", width: "1vw" }} /></Button>
        </CardContent>);
    }
    return textFields;
  };

  const connectionoption = [
    'MQTT',
    'HTPPS',
  ]
  const handleoptions = (name) => {
    if (name === 'AQI Sensor' || name === 'Temp Sensor' || name === 'Switch') {
      if (valueUpdation) {
        setUpdatedName(name)
      }
      else {
        setdeviceName(name)
      }
      setrandomTextEnable(true);
    } else {
      setrandomTextEnable(false)
    }
  }
  const handleotherOptions = () => {
    settypeEnabled(false);
    if (MQTToption) {
      setMQTToption(false)
    }
    else if (HTTPSoption) {
      setHTTPSoption(false)
    }
  }
  const handleConnectionoption = (value) => {
    settypeEnabled(false);
    setconnectionText(value)
    if (value == 'MQTT') {
      setMQTToption(true);
      setHTTPSoption(false);
    }
    else if (value == 'HTPPS') {
      setHTTPSoption(true);
      setMQTToption(false)
    }
    else {
      setHTTPSoption(false);
      setMQTToption(false)
    }
  }


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));


  const userrowData = useSelector(userRowSlicedata)

  const [deviceUserName, setdeviceUserName] = useState("")
  const [updatebtnusername, setupdatebtnusername] = useState("")
  const [deviceName, setdeviceName] = useState("")
  const [deviceUnit, setdeviceUnit] = useState("")
  const [deviceMax, setdeviceMax] = useState("")
  const [deviceMin, setdeviceMin] = useState("")
  const [deviceTmax, setdeviceTmax] = useState("")
  const [deviceTmin, setdeviceTmin] = useState("")
  const [deviceLocation, setDevicelocation] = useState("")
  const [MQTThost, setMQTThost] = useState('')
  const [MQTTupstream, setMQTTupstream] = useState('')
  const [MQTTdownstream, setMQTTdownstream] = useState('')
  const [MQTTusername, setMQTTusername] = useState('')
  const [MQTTpassword, setMQTTpassword] = useState('')
  const [HTTPSusername, setHTTPSusername] = useState('')
  const [HTTPSpassword, setHTTPSpassword] = useState('')
  const [connectionInfoObj, setconnectionInfoObj] = useState([])
  useEffect(() => {
    if (valueUpdation !== true) {
      setdeviceUserName(mainData.name);
      setupdatebtnusername(mainData.name);
      setdeviceName(mainData.deviceInfo[0].field.devicename)
      setdeviceUnit(mainData.deviceInfo[0].field.unit);
      setdeviceMax(mainData.deviceInfo[0].field.max);
      setdeviceMin(mainData.deviceInfo[0].field.min);
      setdeviceTmax(mainData.deviceInfo[0].field.tmax);
      setdeviceTmin(mainData.deviceInfo[0].field.tmin);
      setDevicelocation(mainData.deviceLocation);
      setMQTThost(mainData.MQTT[0].mqttHost);
      setMQTTupstream(mainData.MQTT[0].upstreamPath);
      setMQTTdownstream(mainData.MQTT[0].downstreamPath);
      setMQTTusername(mainData.MQTT[0].username);
      setMQTTpassword(mainData.MQTT[0].password);
      setHTTPSusername(mainData.HTTPS[0].basicAuthusername);
      setHTTPSpassword(mainData.HTTPS[0].setHTTPSpassword);
    }

  }, [mainData]);



  const handleLocationchange = (data) => {
    setDevicelocation(data)
  }


  const handleNamechange = (data) => {
    setdeviceUserName(data)
  }
  const handledeviceUnitchange = (data) => {
    setdeviceUnit(data)
  }

  const handledeviceMaxchange = (data) => {
    setdeviceMax(data)
  }
  const handledeviceMinchange = (data) => {
    setdeviceMin(data)
  }
  const handlethresholdmaxchange = (data) => {
    setdeviceTmax(data)
  }
  const handlethresholdminchange = (data) => {
    setdeviceTmin(data)
  }



  const [updatedID, setupdatedID] = useState(nanoid)
  const [updatedUsername, setUpdatedUsername] = useState('')
  const [updatedName, setUpdatedName] = useState('')
  const [updatedUnit, setUpdatedUnit] = useState('')
  const [updatedMax, setupdatedMax] = useState('')
  const [updatedMin, setupdatedMin] = useState('')
  const [updatedTMax, setupdatedTMax] = useState('')
  const [updatedTMin, setupdatedTMin] = useState('')
  const [updatedLocation, setupdatedLocation] = useState('')
  const [updatedMQTThost, setupdatedMQTThost] = useState('')
  const [updatedMQTTupstreampath, setupdatedMQTTupstreampath] = useState('')
  const [updatedMQTTdownstreampath, setupdatedMQTTdownstreampath] = useState('')
  const [updatedMQTTusername, setupdatedMQTTusername] = useState('')
  const [updatedMQTTpassword, setupdatedMQTTpassword] = useState('')
  const [updatedHTTPSusername, setupdatedHTTPSusername] = useState('')
  const [updatedHTTPSpassword, setupdatedHTTPSpassword] = useState('')
  const [updatedconnectionInfoObj, setupdatedconnectionInfoObj] = useState([])


  const handleUpdatedUsername = (data) => {
    setUpdatedUsername(data)
  }
  const handledeviceNamechange = (data) => {
    setdeviceName(data)
  }
  const handleUpdatedName = (data) => {
    setUpdatedName(data)
  }
  const handleUpdatedUnit = (data) => {
    setUpdatedUnit(data)
  }
  const handleUpdatedMax = (data) => {
    setupdatedMax(data)
  }
  const handleUpdatedMin = (data) => {
    setupdatedMin(data)
  }
  const handleUpdatedTMax = (data) => {
    setupdatedTMax(data)
  }
  const handleUpdatedTMin = (data) => {
    setupdatedTMin(data)
  }
  const handleUpdatedLocation = (data) => {
    setupdatedLocation(data)
  }
  const handleUpdatedMQTThost = (data) => {
    setupdatedMQTThost(data)
  }
  const handleUpdatedMQTTupstream = (data) => {
    setupdatedMQTTupstreampath(data)
  }
  const handleUpdatedMQTTdowntream = (data) => {
    setupdatedMQTTdownstreampath(data)
  }
  const handleupdatedMQTTusername = (data) => {
    setupdatedMQTTusername(data)
  }
  const handleupdatedMQTTpassword = (data) => {
    setupdatedMQTTpassword(data)
  }
  const handleUpdatedHTTPSusername = (data) => {
    setupdatedHTTPSusername(data)
  }
  const handleUpdatedHTTPSpassword = (data) => {
    setupdatedHTTPSpassword(data)
  }

  const addnewUser = {
    deviceId: number,
    name: updatedUsername,
    deviceType: "device type",
    version: "1.0",
    deviceLocation: updatedLocation,
    actionIcons: [
      "add_circle_outline_icon",
      "done_all",
      "delete"
    ],
    status: "Active",
    deviceStatus: false,
    connectionInfo: { type1: "MQTT", type2: "HTTPS" },
    MQTT: [{ mqttHost: updatedMQTThost, upstreamPath: updatedMQTTupstreampath, downstreamPath: updatedMQTTdownstreampath, username: updatedMQTTusername, password: updatedMQTTpassword }],
    HTTPS: [{ basicAuthusername: updatedHTTPSusername, basicAuthPassword: updatedHTTPSpassword }],
    deviceState: { field: 0, field2: 1 },
    deviceInfo: [{ field: {devicename:updatedName,unit:updatedUnit,max:updatedMax,min:updatedMin,tmax:updatedTMax,tmin:updatedTMin} }]
  }

  const updatedUser = {
    deviceId: number,
    name: deviceUserName,
    deviceType: "device type",
    version: "1.0",
    deviceLocation: deviceLocation,
    actionIcons: [
      "add_circle_outline_icon",
      "done_all",
      "delete"
    ],
    status: "Active",
    deviceStatus: false,
    connectionInfo: { type1: "MQTT", type2: "HTTPS" },
    MQTT: [{ mqttHost: MQTThost, upstreamPath: MQTTupstream, downstreamPath: MQTTdownstream, username: MQTTusername, password: MQTTpassword }],
    HTTPS: [{ basicAuthusername: HTTPSusername, basicAuthPassword: HTTPSpassword }],
    deviceState: { field: 0, field2: 1 },
    deviceInfo: [{ field:  {devicename:deviceName,unit:deviceUnit,max:deviceMax,min:updatedMin,tmax:deviceTmax,tmin:deviceTmin} }]
  }



  const handlenewUpdateSubmit = (event) => {
    // event.preventDefault()
    dispatch(addDevice(addnewUser))
  }

  const updatedobj = {
    mainName: updatedName,
    unit: updatedUnit,
    max: updatedMax,
    min: updatedMin,
    tmax: updatedTMax,
    tmin: updatedTMin
  };

  const addedobj = {
    mainName: deviceName,
    unit: deviceUnit,
    max: deviceMax,
    min: deviceMin,
    tmax: deviceTmax,
    tmin: deviceTmin
  };

  const card = (
    <React.Fragment >
      <CardContent style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr)) auto auto", columnGap: '3vw', rowGap: "2vh", width: "77vw" }}>
        <TextField
          required
          value={valueUpdation ? updatedName : deviceName}
          style={{ fontSize: "1rem" }}
          id="outlined-required"
          onChange={(e) => {
            valueUpdation ? handleUpdatedName(e.target.value) : handledeviceNamechange(e.target.value)
          }}
          label="Name"
        />
        <FormControl sx={{ m: 1, minWidth: 120, height: "2.8rem", margin: 0 }}>
          <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
          <Select
            sx={{ height: "3rem", color: "#000" }}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"

            label="Age"
            value={valueUpdation ? updatedUnit : deviceUnit}
            onChange={(e) => { valueUpdation ? handleUpdatedUnit(e.target.value) : handledeviceUnitchange(e.target.value) }}
          >
            <MenuItem value={10}>celcius</MenuItem>
            <MenuItem value={20}>Fahrenheit</MenuItem>
            <MenuItem value={30}>other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          style={{ fontSize: "1rem" }}
          id="outlined-required"
          label="Max value"
          value={valueUpdation ? updatedMax : deviceMax}
          onChange={(e) => { valueUpdation ? handleUpdatedMax(e.target.value) : handledeviceMaxchange(e.target.value) }}
          defaultValue="Hello World"
        />
        <TextField
          required
          style={{ fontSize: "1rem" }}
          id="outlined-required"
          label="Min value"
          value={valueUpdation ? updatedMin : deviceMin}
          onChange={(e) => { valueUpdation ? handleUpdatedMin(e.target.value) : handledeviceMinchange(e.target.value) }}
          defaultValue="Hello World"
        />
        <TextField
          required
          style={{ fontSize: "1rem" }}
          id="outlined-required"
          value={valueUpdation ? updatedTMin : deviceTmin}
          label="Threshold min"
          onChange={(e) => { valueUpdation ? handleUpdatedTMin(e.target.value) : handlethresholdminchange(e.target.value) }}
          defaultValue="Hello World"
        />
        <TextField
          required
          style={{ fontSize: "1rem" }}
          id="outlined-required"
          value={valueUpdation ? updatedTMax : deviceTmax}
          onChange={(e) => { valueUpdation ? handleUpdatedTMax(e.target.value) : handlethresholdmaxchange(e.target.value) }}
          label="Threshold max"
          defaultValue="Hello World"
        />
        <Button variant="contained" style={{ borderRadius: "5rem" }} onClick={() => { handleAddmain(updatedobj, addedobj) }}><AddIcon style={{ color: "#fff", width: "1vw" }} /></Button>
      </CardContent>
    </React.Fragment>
  );
  const card2 = (
    <React.Fragment >
      <CardContent style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: '3vw', rowGap: "2vh", width: "70vw", justifyContent: "flex-start", margin: "auto" }}>
        <Container >

          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            <Paper elevation={0} style={{ margin: "1rem" }}>
              <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Basic Auth Username</MDTypography>
            </Paper>
            {
              valueUpdation ? (<TextField
                required
                value={updatedHTTPSusername}
                style={{ fontSize: "1rem" }}
                id="outlined-required"
                onChange={(e) => {
                  handleUpdatedHTTPSusername(e.target.value)
                }}
                label="HTTPS username"
              />) :
                <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{HTTPSusername}</MDTypography>
            }
          </Stack>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            <Paper elevation={0} style={{ margin: "1rem" }}>
              <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Basic Auth Password</MDTypography>
            </Paper>
            {
              valueUpdation ? (<TextField
                required
                value={updatedHTTPSpassword}
                style={{ fontSize: "1rem" }}
                id="outlined-required"
                onChange={(e) => {
                  handleUpdatedHTTPSpassword(e.target.value)
                }}
                label="HTTPS password"
              />) :
                <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{updatedHTTPSpassword}</MDTypography>
            }
          </Stack>
        </Container>
      </CardContent>
    </React.Fragment>
  );


  const card3 = (
    <React.Fragment >
      <CardContent style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: '3vw', rowGap: "2vh", width: "70vw", justifyContent: "flex-start", margin: "auto" }}>
        <Container >

          <Paper elevation={0} style={{ margin: "1rem", padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>MQTT Host</MDTypography>
            {
              valueUpdation ? (<TextField
                required
                value={updatedMQTThost}
                style={{ fontSize: "1rem" }}
                id="outlined-required"
                onChange={(e) => {
                  handleUpdatedMQTThost(e.target.value)
                }}
                label="MQTT host"
              />) :
                <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{MQTThost}</MDTypography>
            }
          </Paper>

          <Paper elevation={0} style={{ margin: "1rem", padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Upstream Path</MDTypography>
            {
              valueUpdation ? (<TextField
                required
                value={updatedMQTTupstreampath}
                style={{ fontSize: "1rem" }}
                id="outlined-required"
                onChange={(e) => {
                  handleUpdatedMQTTupstream(e.target.value)
                }}
                label="MQTT upstream"
              />) :
                <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{MQTTupstream}</MDTypography>
            }
          </Paper>

          <Paper elevation={0} style={{ margin: "1rem", padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Downstream Path</MDTypography>
            {
              valueUpdation ? (<TextField
                required
                value={updatedMQTTdownstreampath}
                style={{ fontSize: "1rem" }}
                id="outlined-required"
                onChange={(e) => {
                  handleUpdatedMQTTdowntream(e.target.value)
                }}
                label="MQTT downstream"
              />) :
                <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{MQTTdownstream}</MDTypography>
            }
          </Paper>

          <Paper elevation={0} style={{ margin: "1rem", padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Username</MDTypography>
            {
              valueUpdation ? (<TextField
                required
                value={updatedMQTTusername}
                style={{ fontSize: "1rem" }}
                id="outlined-required"
                onChange={(e) => {
                  handleupdatedMQTTusername(e.target.value)
                }}
                label="MQTT username"
              />) :
                <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{MQTTusername}</MDTypography>
            }
          </Paper>

          <Paper elevation={0} style={{ margin: "1rem", padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Password</MDTypography>
            {
              valueUpdation ? (<TextField
                required
                value={updatedMQTTpassword}
                style={{ fontSize: "1rem" }}
                id="outlined-required"
                onChange={(e) => {
                  handleupdatedMQTTpassword(e.target.value)
                }}
                label="MQTT password"
              />) :
                <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{MQTTpassword}</MDTypography>
            }
          </Paper>
        </Container>
      </CardContent>
    </React.Fragment>
  );

  const handleIcons = () => {
    settypeEnabled(true)
    if (typeMenuOpen) {
      setTypeMenuOpen(false)
    }
    else {
      setTypeMenuOpen(true)
      handleotherOptions()
    }
  }
  const handleIcons2 = () => {
    setlocationIconEnable(!locationIconEnable);
    settypeEnabled(false)
    if (locationIconEnable) {
      handleMenuClose('location')();
    } else {
      handleMenuOpen('location')();
    }
  };

  const handleIcons3 = () => {
    if (MQTToption || HTTPSoption) {
      handleMenuClose('connection')();
    } else {
      handleMenuOpen('connection')();
    }
  }
  const handleUpdatebtn = (name, data) => {
    dispatch(updateDevice({ name: name, userData: data }))
  }


  return (
    <Box pt={6} pb={3} xs={12}>
      {
        snackbarEnable ?
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              severity="success"
              variant="filled"
              sx={{ width: '100%', color: "#fff" }}
            >
              Form submitted suceessfully
            </Alert>
          </Snackbar> : null

      }


      <form onSubmit={handlenewUpdateSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Box p={3} >
                <Box mb={2} onClick={() => { handleotherOptions() }}>
                  <MDInput
                    type='text'
                    name='name'
                    label='Name'
                    value={valueUpdation ? updatedUsername : deviceUserName}
                    variant='standard'
                    fullWidth
                    onChange={(e) => { valueUpdation ? handleUpdatedUsername(e.target.value) : handleNamechange(e.target.value) }}
                  />
                  {error.deviceName && <span style={{ color: "red" }}>{error.deviceName}</span>}
                </Box>

                <FormControl variant='standard' sx={{ py: 1, minWidth: '100%' }}>
                  <InputLabel isrequired id='type-select-label' >Type</InputLabel>
                  <Select
                    labelId='type-select-label'
                    name='type'
                    value={valueUpdation ? updatedName : deviceName}
                    onChange={handleChange}
                    label='Type'
                    onClick={() => { handleIcons() }}
                    open={typeMenuOpen}
                    onOpen={handleMenuOpen('type')}
                    onClose={handleMenuClose('type')}
                    IconComponent={() => (
                      <IconButton
                        size='large'
                        style={{ padding: 0, marginRight: '8px' }}
                        aria-label='open-menu'
                      >
                        <Icon onClick={() => { handleIcons() }}>{typeEnabled ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Icon>
                      </IconButton>
                    )}
                    sx={{ paddingLeft: 0, marginLeft: 0 }}
                  >
                    {types.map((name) => (
                      <MenuItem key={name} value={name} onClick={(e) => { handleoptions(name) }}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {error.type && <span style={{ color: "red" }}>{error.type}</span>}
                  {
                    typeEnabled ? <Container maxWidth="sm" spacing={2} style={{ top: "20px" }} >
                      <Box sx={{ minWidth: 275 }} >
                        <Grid container xs={12}>
                          <Card variant="outlined">
                            {card}
                            <Grid container xs={12}>
                              {renderTextFields()}
                            </Grid>
                          </Card>
                        </Grid>
                      </Box>
                    </Container> : null
                  }
                </FormControl>


                <FormControl variant='standard' sx={{ py: 1, minWidth: '100%' }}>
                  <InputLabel id='location-select-label'>Location</InputLabel>
                  <Select
                    required
                    labelId='location-select-label'
                    name='location'
                    value={valueUpdation ? updatedLocation : deviceLocation}
                    onChange={(e) => { valueUpdation ? handleUpdatedLocation(e.target.value) : handleLocationchange(e.target.value) }}
                    label='Location'
                    open={locationMenuOpen}
                    onOpen={handleMenuOpen('location')}
                    onClose={handleMenuClose('location')}
                    IconComponent={() => (
                      <IconButton
                        size='large'
                        style={{ padding: 0, marginRight: '8px' }}
                        aria-label='open-menu'
                      >
                        <Icon onClick={() => { handleIcons2() }}>{locationIconEnable ? <ArrowDropDownIcon /> : <ArrowDropDownIcon />}</Icon>
                      </IconButton>
                    )}
                  >
                    {locations.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {error.location && <span style={{ color: "red" }}>{error.location}</span>}
                </FormControl>

                <Box mb={2} onClick={() => { handleotherOptions() }}>
                  <FormControl variant='standard' sx={{ py: 1, minWidth: '100%' }}>
                    <InputLabel id='connection-select-label'>Connection option</InputLabel>
                    <Select
                      required
                      labelId='connection-select-label'
                      name='connection'
                      value={connectionText}
                      onChange={handleChange}
                      label='connection'
                      open={connectionOptionEnable}
                      onOpen={handleMenuOpen('connection')}
                      onClose={handleMenuClose('connection')}
                      IconComponent={() => (
                        <IconButton
                          size='large'
                          style={{ padding: 0, marginRight: '8px' }}
                          aria-label='open-menu'
                        >
                          <Icon onClick={() => { handleIcons3() }}>{(MQTToption || HTTPSoption) ? <ArrowDropUpIcon /> : (!MQTToption || !HTTPSoption) ? <ArrowDropDownIcon /> : <ArrowDropDownIcon />}</Icon>
                        </IconButton>
                      )}
                    >
                      {connectionoption.map((name) => (
                        <MenuItem key={name} value={name} onClick={() => { handleConnectionoption(name) }}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error.connectionOption && <span style={{ color: "red" }}>{error.connectionOption}</span>}
                  </FormControl>
                </Box>
                <Container maxWidth="sm" spacing={2} >
                  <Box sx={{ minWidth: 275 }} >
                    <Grid container xs={12}>
                      {(MQTToption || HTTPSoption) ?
                        <Card variant="outlined">
                          {MQTToption ? card3 : HTTPSoption ? card2 : null}
                        </Card> : null
                      }
                    </Grid>
                  </Box>
                </Container>
                <Box style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem" }}>
                  {
                    !isUpdate ? <MDButton color="success" onClick={() => { handlenewUpdateSubmit() }}>Submit </MDButton> : null
                  }

                  {
                    isUpdate ? <MDButton color="primary" onClick={() => { handleUpdatebtn(updatebtnusername, updatedUser) }}>Update</MDButton> : null
                  }
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default DeviceForm
