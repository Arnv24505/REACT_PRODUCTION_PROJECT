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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from 'layouts/dashboard'
import DeviceManagement from 'layouts/device-management'
import Alarms from 'layouts/alarms'
import RuleManagement from 'layouts/rule-management'
import Realtime from 'layouts/realtime'
import Analytics from 'layouts/analytics'
import Navigation from 'layouts/navigation'
import Notifications from "layouts/notifications";
import UserManagement from 'layouts/user-management'
import AdministrationSetting from 'layouts/administration-setting'
import DataSource from 'layouts/dataSource/data-source'

// @mui icons
import Icon from '@mui/material/Icon'

const routes = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize='large'>dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'Data Source',
    key: 'data-source',
    icon: <Icon fontSize='large'>assignment</Icon>,
    route: '/dataSource/data-source',
    component: <DataSource />,
  },
  {
    type: 'collapse',
    name: 'Device Management',
    key: 'device-management',
    icon: <Icon fontSize='large'>table_view</Icon>,
    route: '/device-management',
    component: <DeviceManagement />,
  },
  {
    type: 'collapse',
    name: 'Alarms',
    key: 'alarms',
    icon: <Icon fontSize='large'>alarm</Icon>,
    route: '/alarms',
    component: <Alarms />,
  },
  {
    type: 'collapse',
    name: 'Rule Management',
    key: 'rule-management',
    icon: <Icon fontSize='large'>receipt_long</Icon>,
    route: '/rule-Management',
    component: <RuleManagement />,
  },
  {
    type: 'collapse',
    name: 'Realtime',
    key: 'realtime',
    icon: <Icon fontSize='large'>format_textdirection_r_to_l</Icon>,
    route: '/realtime',
    component: <Realtime />,
  },
  {
    type: 'collapse',
    name: 'Analytics',
    key: 'analytics',
    icon: <Icon fontSize='large'>analytics</Icon>,
    route: '/analytics',
    component: <Analytics />,
  },
  {
    type: 'collapse',
    name: 'Navigation',
    key: 'navigation',
    icon: <Icon fontSize='large'>navigation</Icon>,
    route: '/navigation',
    component: <Navigation />,
  },
  {
    type: 'collapse',
    name: 'Admin',
    key: 'admin',
    icon: <Icon fontSize='large'>admin_panel_settings</Icon>,
    submenu: [
      {
        type: 'collapse',
        name: 'Administration Setting',
        key: 'administration-setting',
        icon: <Icon fontSize='large'>login</Icon>,
        route: '/admin/administration-setting',
        component: <AdministrationSetting />,
      },
    ],
  },
  {
    name: 'Administration Setting',
    key: 'administration-setting',
    icon: <Icon fontSize='large'>login</Icon>,
    route: '/admin/administration-setting',
    component: <AdministrationSetting />,
  },
  {
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="large">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    name: 'User management',
    key: 'user-management',
    icon: <Icon fontSize='large'>person</Icon>,
    route: '/user-management',
    component: <UserManagement />,
  },
]

export default routes
