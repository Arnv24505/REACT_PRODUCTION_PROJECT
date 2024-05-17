import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Sidenav from 'examples/Sidenav'
import MiniDrawer from 'examples/Sidenav'
import Configurator from 'examples/Configurator'
import theme from 'assets/theme'
import themeDark from 'assets/theme-dark'
import Login from 'layouts/authentication/sign-in'
import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'

// Material Dashboard 2 React routes
import routes from 'routes'

// Material Dashboard 2 React contexts
import { setLayout, setMiniSidenav, setOpenConfigurator, useMaterialUIController } from 'context'

// Images
import brandWhite from 'assets/images/logo-ct.png'
import brandDark from 'assets/images/logo-ct-dark.png'
import { useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { userSelector } from './store/user/slice/userSlice'
import { getUser } from './store/user/saga/userSaga'

export default function App () {
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller
  const [onMouseEnter, setOnMouseEnter] = useState(false)
  const [rtlCache, setRtlCache] = useState(null)
  const { pathname } = useLocation()
  console.log('pathname now in aPP is' , pathname)
  useEffect(() => {
    console.log('pathname now is' , pathname)
    if(['/login' , '/logout' , '/signup'].includes(pathname)) {
      setLayout(dispatch, 'login')
    }else {
      setLayout(dispatch, 'dashboard')
    }

  }, [pathname])
  /*const { user } = useSelector(userSelector)
  useEffect(() => {
    console.log('user is' , user)
    if(!user) {
      dispatch(getUser())
    }
  }, [user])*/
  console.log('layout now is ' , layout)
  const hider = useMediaQuery(theme.breakpoints.up('xl'))
  const hider2 = useMediaQuery(theme.breakpoints.up('lg'))
  const hider3 = useMediaQuery(theme.breakpoints.up('md'))
  const hider4 = useMediaQuery(theme.breakpoints.up('sm'))
  const hider5 = useMediaQuery(theme.breakpoints.up('xs'))
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin],
    })

    setRtlCache(cacheRtl)
  }, [])

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if(miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if(onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator)

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if(route.collapse) {
        return getRoutes(route.collapse)
      }

      if(route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />
      }

      return null

    })

  const [marginSetter, setmargineSetter] = useState(0)

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />

      {layout === 'dashboard' &&  (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName='Quarkifi QConsole'
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            setMarginSetter={setmargineSetter}
          />
          <MiniDrawer
            routes={routes}
            brandName='material ui'
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            setMarginSetter={setmargineSetter} />
          <Configurator />
        </>
      )}
      <div className='container' style={{ marginLeft: (!hider4 || !hider5) ? '0px' : marginSetter }}>
        {layout === 'vr' && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path='*' element={<Navigate to='/login' />} />
          {/*{!user && (
            <Route path='*' element={<Navigate to='/login' />} />
          )}*/}
        </Routes>
      </div>
    </ThemeProvider>
  )
}



