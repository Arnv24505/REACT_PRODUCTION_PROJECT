
// Material Dashboard 2 React components
import MDBox from 'components/MDBox'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DropDown from './library/DropDown'
import { data } from './apiCall/lineApi'

const analytics = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={ 2 }>
        <DropDown data={ data } />
      </MDBox>
    </DashboardLayout>
  )
}

export default analytics
