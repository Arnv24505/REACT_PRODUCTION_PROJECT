import { Link, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import MDBox from '../../../components/MDBox'
import MDTypography from '../../../components/MDTypography'
import MDInput from '../../../components/MDInput'
import MDButton from '../../../components/MDButton'
import Grid from '@mui/material/Grid'
import { registerUser } from '../../../store/user/saga/userSaga'
import { useState } from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import quarkifiLogo from '../../../assets/images/QUARKIFI_blue.png'

function SignUp () {
  const [name, setName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [cPassWord, setCPassWord] = useState('')
  const [email, setEmail] = useState('')
  const [submitOk, setSubmitOk] = useState(false)
  const [agree, setAgree] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const checkPasswordSubmit = (pass1, pass2) => {
    if(agree && !_.isEmpty(name) && !_.isEmpty(email) && !_.isEmpty(pass1) && !_.isEmpty(pass2)
      && pass1 === pass2) {
      setSubmitOk(true)
    } else {
      setSubmitOk(false)
    }
  }
  const checkSubmitName = (val) => {
    if(agree && !_.isEmpty(val) && !_.isEmpty(email) && !_.isEmpty(passWord)
      && cPassWord === passWord) {
      setSubmitOk(true)
    } else {
      setSubmitOk(false)
    }
  }
  const checkSubmitEmail = (val) => {
    if(agree && !_.isEmpty(val) && !_.isEmpty(name) && !_.isEmpty(passWord)
      && cPassWord === passWord) {
      setSubmitOk(true)
    } else {
      setSubmitOk(false)
    }
  }
  const checkAgree = (val) => {
    if(val && !_.isEmpty(email) && !_.isEmpty(name) && !_.isEmpty(passWord)
      && cPassWord === passWord) {
      setSubmitOk(true)
    } else {
      setSubmitOk(false)
    }
  }
  const handleDispatch = () => {
    if(!submitOk) return
    dispatch(registerUser({ email, name, password: passWord, navigate }))
  }

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Grid item lg={4} xs={8} mg={4}>
        <Card>
          <img style={{ marginTop: 10, alignSelf: 'center' }} width={250} src={quarkifiLogo} />
          <MDBox
            variant='gradient'
            bgColor='info'
            borderRadius='lg'
            coloredShadow='success'
            mx={2}
            mt={3}
            p={3}
            mb={1}
            textAlign='center'
          >
            <MDTypography variant='h4' fontWeight='medium' color='white' mt={1}>
              Join QConsole
            </MDTypography>
            <MDTypography display='block' variant='button' color='white' my={1}>
              Enter your email and password to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component='form' role='form'>
              <MDBox mb={2}>
                <MDInput type='text' label='Name' fullWidth value={name}
                         onKeyPress={(e) => {
                           if(e.key === 'Enter') {
                             handleDispatch()
                           }
                         }}
                         onChange={(evt) => {
                           setName(evt.target.value)
                           checkSubmitName(evt.target.value)
                         }} />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type='text' label='Email' fullWidth value={email}
                         onKeyPress={(e) => {
                           if(e.key === 'Enter') {
                             handleDispatch()
                           }
                         }}
                         onChange={(evt) => {
                           setEmail(evt.target.value)
                           checkSubmitEmail(evt.target.value)
                         }} />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type='password' label='Password' fullWidth value={passWord}
                         onKeyPress={(e) => {
                           if(e.key === 'Enter') {
                             handleDispatch()
                           }
                         }}
                         onChange={(evt) => {
                           setPassWord(evt.target.value)
                           checkPasswordSubmit(evt.target.value, cPassWord)
                         }} />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type='password' label='Confirm Password' fullWidth value={cPassWord}
                         onKeyPress={(e) => {
                           if(e.key === 'Enter') {
                             handleDispatch()
                           }
                         }}
                         onChange={(evt) => {
                           setCPassWord(evt.target.value)
                           checkPasswordSubmit(evt.target.value, passWord)
                         }} />
              </MDBox>
              <MDBox display='flex' alignItems='center' ml={-1}>
                <Checkbox
                  checked={agree}
                  onChange={(evt) => {
                    setAgree(evt.target.checked)
                    checkAgree(evt.target.checked)
                  }} />
                <MDTypography
                  variant='button'
                  fontWeight='regular'
                  color='text'
                  sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
                >
                  I agree the
                </MDTypography>
                <MDTypography
                  component='a'
                  href='#'
                  variant='button'
                  fontWeight='bold'
                  color='info'
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1} sx={{ textAlign: 'center' }}>
                <MDButton
                  onClick={handleDispatch}
                  variant='gradient'
                  color='info'
                  fullWidth
                  size={'large'}
                  sx={{ width: '50%' }}
                  disabled={!submitOk}
                >
                  register
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign='center'>
                <MDTypography variant='button' color='text'>
                  Already have an account?{' '}
                  <MDTypography
                    component={Link}
                    to='/login'
                    variant='button'
                    color='info'
                    fontWeight='medium'
                    textGradient
                  >
                    Sign In
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

export default SignUp
