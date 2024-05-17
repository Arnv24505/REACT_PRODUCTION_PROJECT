// Material Dashboard 2 React layouts
import Dashboard from 'layouts/dashboard'
import Login from 'layouts/authentication/sign-in'
import Logout from 'layouts/authentication/sign-out'
import SignUp from 'layouts/authentication/sign-up'
import DeviceManagement from 'layouts/device-management/device'
import DeviceTemplateManagement from 'layouts/device-management/template'
import Alarms from 'layouts/alarms'
import RuleManagement from 'layouts/rule-management'
import Realtime from 'layouts/realtime'
import Analytics from 'layouts/analytics'
import Navigation from 'layouts/navigation'
import Notifications from 'layouts/notifications'
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
    name: 'SignIn',
    key: 'signin',
    icon: <Icon fontSize='large'>login</Icon>,
    route: '/login',
    component: <Login />,
  },
  {
    type: 'collapse',
    name: 'SignOut',
    key: 'signout',
    icon: <Icon fontSize='large'>logout</Icon>,
    route: '/logout',
    component: <Logout />,
  },
  {
    type: 'collapse',
    name: 'SignUp',
    key: 'signup',
    icon: <Icon fontSize='large'>logout</Icon>,
    route: '/signup',
    component: <SignUp />,
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
    name: 'Device Template Management',
    key: 'device-template-management',
    icon: <Icon fontSize='large'>table_view</Icon>,
    route: '/device-template-management',
    component: <DeviceTemplateManagement />,
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
    name: 'Notifications',
    key: 'notifications',
    icon: <Icon fontSize='large'>notifications</Icon>,
    route: '/notifications',
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
