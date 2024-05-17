/**
 =========================================================
 * Material Dashboard 2 React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'

function SimpleSourceCard ({ color, title, label, onClick, icon }) {
  return (
    <Card>
      <MDButton onClick={onClick} display='flex' sx={{ p: 0 }} size='large'>
        <MDBox>
          <MDBox
            variant='gradient'
            bgColor={color}
            color={color === 'light' ? 'dark' : 'white'}
            coloredShadow={color}
            borderRadius='xl'
            display='flex'
            justifyContent='center'
            alignItems='center'
            width='5rem'
            height='5rem'
            mt={3}
          >
            <Icon
              fontSize={'large'}
              color='inherit'
            >
              {icon}
            </Icon>
          </MDBox>
          <Divider />
          <MDBox
            textAlign='center'
            // lineHeight={1.25}
            alignItems='center'
            justifyContent='center'>
            <MDTypography variant='button' fontWeight='light' color='text'>
              {label}
            </MDTypography>
            <MDTypography mb={2}>{title}</MDTypography>
          </MDBox>
        </MDBox>
      </MDButton>
    </Card>
  )
}

// Setting default values for the props of SimpleSourceCard
SimpleSourceCard.defaultProps = {
  color: 'info',
  percentage: {
    color: 'success',
    text: '',
    label: '',
  },
}

// Typechecking props for the SimpleSourceCard
SimpleSourceCard.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'white',
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
}

export default SimpleSourceCard
