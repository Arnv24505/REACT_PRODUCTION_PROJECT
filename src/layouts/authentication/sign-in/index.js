import {
  useEffect,
  useState,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import bgImage from 'assets/images/bg-profile.jpeg'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import quarkifiLogo from '../../../assets/images/QUARKIFI_blue.png'
import { userSelector } from '../../../store/user/slice/userSlice'
import { getUser, loginUser } from '../../../store/user/saga/userSaga'
import MDBox from '../../../components/MDBox'
import MDTypography from '../../../components/MDTypography'
import MDInput from '../../../components/MDInput'
import MDButton from '../../../components/MDButton'
import Grid from '@mui/material/Grid'

function Basic () {
  const [rememberMe, setRememberMe] = useState(true)
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')

  const handleSetRememberMe = () => setRememberMe(!rememberMe)
  const dispatch = useDispatch()
  const { user } = useSelector(userSelector)
  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    } else {
      dispatch(getUser())
    }
  }, [user])
  return (
    <Grid container sx={{display : 'flex' , justifyContent  : 'center'}}>
      <Grid item lg={4} xs={8} mg={4}>
      <Card >
        <img style={{marginTop : 10 , alignSelf : 'center'}} width={250} src={quarkifiLogo} />
        <MDBox
          variant='gradient'
          bgColor='info'
          borderRadius='lg'
          coloredShadow='info'
          mx={2}
          mt={4}
          p={2}
          mb={1}
          textAlign='center'
        >
          <MDTypography variant='h4' fontWeight='medium' color='white' mt={1}>
            QConsole
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component='form' role='form'>
            <MDBox mb={2}>
              <MDInput type='text' label='UserName' fullWidth value={userName}
                       onKeyPress={(e) => {
                         if (e.key === "Enter") {
                           dispatch(loginUser({ username: userName, password: passWord }))
                         }
                       }}
                       onChange={(evt) => {setUserName(evt.target.value)}} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type='password' label='Password' fullWidth
                       value={passWord}
                       onKeyPress={(e) => {
                         if (e.key === "Enter") {
                           dispatch(loginUser({ username: userName, password: passWord }))
                         }
                       }}
                       onChange={(evt) => {setPassWord(evt.target.value)}} />
            </MDBox>
            <MDBox display='flex' alignItems='center' ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant='button'
                fontWeight='regular'
                color='text'
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1} sx={{ textAlign : 'center' }}>
              <MDButton
                variant='gradient'
                color='info'
                size={'large'}
                fullWidth
                sx={{width : '50%' }}
                onClick={() => {
                  dispatch(loginUser({ username: userName, password: passWord }))
                }}
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign='center'>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign='center'>
              <MDTypography variant='button' color='text'>
                Register If New User ?{' '}
                <MDTypography
                  component={Link}
                  to='/signup'
                  variant='button'
                  color='info'
                  fontWeight='medium'
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      </Grid>
    </Grid>
  )
}

export default Basic
