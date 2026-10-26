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
import DatapipelineMain from 'layouts/data-pipeline'

// @mui icons
import Icon from '@mui/material/Icon'

const routes = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    showMenu : true,
    icon: <Icon fontSize='large'>dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    showMenu : false,
    name: 'SignIn',
    key: 'signin',
    icon: <Icon fontSize='large'>login</Icon>,
    route: '/login',
    component: <Login />,
  },
  {
    type: 'collapse',
    name: 'SignOut',
    showMenu : false,
    key: 'signout',
    icon: <Icon fontSize='large'>logout</Icon>,
    route: '/logout',
    component: <Logout />,
  },
  {
    type: 'collapse',
    name: 'SignUp',
    showMenu : false,
    key: 'signup',
    icon: <Icon fontSize='large'>logout</Icon>,
    route: '/signup',
    component: <SignUp />,
  },
  {
    type: 'collapse',
    name: 'Data Source',
    showMenu : true,
    key: 'data-source',
    icon: <Icon fontSize='large'>assignment</Icon>,
    route: '/dataSource/data-source',
    component: <DataSource />,
  },
  {
    type: 'collapse',
    name: 'Device Management',
    showMenu : true,
    key: 'device-management',
    icon: <Icon fontSize='large'>table_view</Icon>,
    route: '/device-management',
    component: <DeviceManagement />,
  },
  {
    type: 'collapse',
    name: 'Device Template Management',
    showMenu : false,
    key: 'device-template-management',
    icon: <Icon fontSize='large'>table_view</Icon>,
    route: '/device-template-management',
    component: <DeviceTemplateManagement />,
  },
  {
    type: 'collapse',
    name: 'Alarms',
    showMenu : true,
    key: 'alarms',
    icon: <Icon fontSize='large'>alarm</Icon>,
    route: '/alarms',
    component: <Alarms />,
  },
  {
    type: 'collapse',
    name: 'Rule Management',
    showMenu : true,
    key: 'rule-management',
    icon: <Icon fontSize='large'>receipt_long</Icon>,
    route: '/rule-Management',
    component: <RuleManagement />,
  },
  {
    type: 'collapse',
    name: 'Data Pipeline',
    showMenu : true,
    key: 'data-pipline',
    icon: <Icon fontSize='large'>receipt_long</Icon>,
    route: '/data-pipline',
    component: <DatapipelineMain />,
  },
  {
    type: 'collapse',
    name: 'Realtime',
    showMenu : true,
    key: 'realtime',
    icon: <Icon fontSize='large'>format_textdirection_r_to_l</Icon>,
    route: '/realtime',
    component: <Realtime />,
  },
  {
    type: 'collapse',
    name: 'Analytics',
    showMenu : true,
    key: 'analytics',
    icon: <Icon fontSize='large'>analytics</Icon>,
    route: '/analytics',
    component: <Analytics />,
  },
  {
    type: 'collapse',
    name: 'Navigation',
    showMenu : true,
    key: 'navigation',
    icon: <Icon fontSize='large'>navigation</Icon>,
    route: '/navigation',
    component: <Navigation />,
  },
  {
    type: 'collapse',
    name: 'Admin',
    showMenu : true,
    key: 'admin',
    icon: <Icon fontSize='large'>admin_panel_settings</Icon>,
    submenu: [
      {
        type: 'collapse',
        name: 'Administration Setting',
        showMenu : true,
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
    showMenu : true,
    icon: <Icon fontSize='large'>login</Icon>,
    route: '/admin/administration-setting',
    component: <AdministrationSetting />,
  },
  {
    name: 'Notifications',
    key: 'notifications',
    showMenu : true,
    icon: <Icon fontSize='large'>notifications</Icon>,
    route: '/notifications',
    component: <Notifications />,
  },
  {
    name: 'User management',
    key: 'user-management',
    showMenu : true,
    icon: <Icon fontSize='large'>person</Icon>,
    route: '/user-management',
    component: <UserManagement />,
  },
]

export default routes
