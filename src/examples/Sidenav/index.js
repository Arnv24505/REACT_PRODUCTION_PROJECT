import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link, NavLink } from 'react-router-dom'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, createTheme, useMediaQuery } from '@mui/material'
import MDTypography from 'components/MDTypography'

const drawerWidth = 340

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

export default function MiniDrawer ({ brandName, routes, setMarginSetter }) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [submenuOpen, setSubmenuOpen] = React.useState({})
  const [collapsedWidth, setCollapsedWidth] = React.useState(64) // Define a collapsed width
  const [drawerShower, setdrawerShower] = React.useState(false)
  const [iconActive, setIconActive] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
    setMarginSetter('14vw')
  }

  const handleDrawerClose = () => {
    setOpen(false)
    setMarginSetter('0vw')

  }

  const menuiconHandle = () => {
    setIconActive(!iconActive)
    console.log('MY ICON ACTIVE >>>>>>>>>>>>>:::::::::::', iconActive)
  }

  const handleSubmenuToggle = (parentName) => {
    setSubmenuOpen((prev) => ({ ...prev, [parentName]: !prev[parentName] }))
  }

  const renderSubMenu = (submenu, parentName) => (
    <Collapse in={submenuOpen[parentName]} timeout='auto' unmountOnExit>
      <List>
        {submenu.map(({ name: subName, key, icon: subIcon, route: subRoute }) => (
          <ListItem key={subName} disablePadding>
            <NavLink key={key} to={subRoute}>
              <ListItemButton component={Link} to={subRoute}>
                <ListItemIcon>{subIcon}</ListItemIcon>
                <ListItemText>
                  <MDTypography variant='body2'>{subName}</MDTypography>
                </ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Collapse>
  )
  const hider = useMediaQuery(theme.breakpoints.up('xl'))
  const hider2 = useMediaQuery(theme.breakpoints.up('lg'))
  const hider3 = useMediaQuery(theme.breakpoints.up('md'))
  const hider4 = useMediaQuery(theme.breakpoints.up('sm'))
  const hider5 = useMediaQuery(theme.breakpoints.up('xs'))

  return (
    <div className='container' style={{ height: '0vh' }}>

      <AppBar position='fixed' open={open} style={{ display: (!hider3 || !hider3) ? 'block' : 'none' }}>
        <Toolbar>
          {
            (!hider || !hider2) ?

              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={() => {
                  handleDrawerOpen()
                  menuiconHandle()
                }}
                sx={{
                  ...(open && { display: (hider || hider2) ? 'none' : 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton> : null
          }

        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open} sx={{
        width: open ? '240px' : `${collapsedWidth}px`,
        transition: 'width 0.3s',
        display: (hider3 || hider4) ? 'block' : iconActive ? 'block' : 'none',
      }}

      >
        {
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => {
              handleDrawerOpen()
              menuiconHandle()
            }}
            sx={{
              ...(open && { display: (hider || hider2) ? 'none' : 'block' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        }

        {open && (
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
        )}
        <Divider />
        <List>
          {routes.map(({ type, name, icon, route, submenu }) => (
            type === 'collapse' && (
              <React.Fragment key={name}>
                {submenu ? (
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => handleSubmenuToggle(name)}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>
                          <MDTypography variant='body2'>{name}</MDTypography>
                        </ListItemText>
                        {submenuOpen[name] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    {renderSubMenu(submenu, name, route)}
                  </List>
                ) : (
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={route}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>
                        <MDTypography variant='body2'>{name}</MDTypography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                )}
              </React.Fragment>
            )
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </div>

  )
}

