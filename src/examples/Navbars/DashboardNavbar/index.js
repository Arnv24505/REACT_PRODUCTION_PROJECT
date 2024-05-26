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

import { useEffect, useState } from 'react'

// react-router components
import { Link, useLocation } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @material-ui core components
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDInput from 'components/MDInput'
import Breadcrumbs from 'examples/Breadcrumbs'
import NotificationItem from 'examples/Items/NotificationItem'

import { navbar, navbarContainer, navbarIconButton, navbarRow } from 'examples/Navbars/DashboardNavbar/styles'

import { setMiniSidenav, setOpenConfigurator, setTransparentNavbar, useMaterialUIController } from 'context'

function DashboardNavbar ({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState()
  const [controller, dispatch] = useMaterialUIController()
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller
  const [openAnalyticsMenu, setOpenAnalyticsMenu] = useState(false)
  const [openAccountCircleMenu, setOpenAccountCircleMenu] = useState(false)
  const route = useLocation().pathname.split('/').slice(1)

  useEffect(() => {
    if(fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    function handleTransparentNavbar () {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar)
    }

    window.addEventListener('scroll', handleTransparentNavbar)

    handleTransparentNavbar()

    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav)
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator)
  const handleOpenMenu = (event) => setOpenAccountCircleMenu(event.currentTarget)
  const handleCloseMenu = () => setOpenAccountCircleMenu(false)

  const handleOpenAnalyticsMenu = (event) => setOpenAnalyticsMenu(event.currentTarget)
  const handleCloseAnalyticsMenu = () => setOpenAnalyticsMenu(false)

  const renderMenu = () => (
    <Menu
      anchorEl={openAnalyticsMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openAnalyticsMenu)}
      onClose={handleCloseAnalyticsMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title='Check new messages' />
      <NotificationItem icon={<Icon>podcasts</Icon>} title='Manage Podcast sessions' />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title='Payment successfully completed' />
    </Menu>
  )

  const renderAccountCircleMenu = () => (
    <Menu
      anchorEl={openAccountCircleMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openAccountCircleMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <Link to='/user-management' style={{ textDecoration: 'none', color: 'inherit' }}>
        <NotificationItem icon={<Icon>account_circle</Icon>} title='User Profile' />
      </Link>
      <Link to='/logout' style={{ textDecoration: 'none', color: 'inherit' }}>
        <NotificationItem icon={<Icon>logout</Icon>} title='Sign Out' />
      </Link>
    </Menu>
  )

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main

      if(transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main
      }

      return colorValue
    },
  })

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color='inherit'

      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>

        <MDBox color='inherit' mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon='home' title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label='Search here' />
            </MDBox>
            <MDBox color={light ? 'white' : 'inherit'}>
              <IconButton
                size='small'
                disableRipple
                color='inherit'
                sx={navbarIconButton}
                aria-controls='account-circle-menu'
                aria-haspopup='true'
                variant='contained'
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              {renderAccountCircleMenu()}
              <IconButton
                size='small'
                disableRipple
                color='inherit'
                sx={navbarIconButton}
                component={Link} // Use Link component
                to='/notifications' // Link to /notifications
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              <IconButton
                size='small'
                disableRipple
                color='inherit'
                sx={navbarIconButton}
                aria-controls='notification-menu'
                aria-haspopup='true'
                variant='contained'
                onClick={handleOpenAnalyticsMenu}
              >
                <Icon sx={iconsStyle}>analytics</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  )
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
}

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
}

export default DashboardNavbar
