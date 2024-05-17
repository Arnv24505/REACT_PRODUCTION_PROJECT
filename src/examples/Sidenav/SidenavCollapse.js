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

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @mui material components
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'

// Custom styles for the SidenavCollapse
import { collapseIcon, collapseIconBox, collapseItem, collapseText } from 'examples/Sidenav/styles/sidenavCollapse'

// Material Dashboard 2 React context
import { useMaterialUIController } from 'context'
import { IconButton, List, ListItemButton } from '@mui/material'
import { useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'

function SidenavCollapse ({ icon, name, active, submenu, ...rest }) {
  const [controller] = useMaterialUIController()
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  return (
    <ListItem component='li'>
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
            transparentSidenav,
            whiteSidenav,
            darkMode,
            sidenavColor,
          })
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
            }
          >
            {typeof icon === 'string' ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>
          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />
          {submenu && (
            <IconButton variant='plain' size='sm' color='neutral' onClick={handleClick}>
              <KeyboardArrowDown sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }} />
            </IconButton>
          )}
        </ListItemButton>
      </MDBox>

      {open && submenu && (
        <MDBox>
          <List sx={{ paddingLeft: 2 }}>
            {submenu.map((subitem, index, { name, icon, active }) => (
              <ListItem key={index}>
                <ListItemButton>{subitem}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </MDBox>
      )}
    </ListItem>
  )
}

SidenavCollapse.defaultProps = {
  active: false,
}

SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  submenu: PropTypes.array, // Assuming submenu is an array of strings, you may need to adjust this based on your data structure
}

export default SidenavCollapse
