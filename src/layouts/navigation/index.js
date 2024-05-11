// Material Dashboard 2 React components
import MDBox from 'components/MDBox'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Map from './map'

const Navigation = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={ 2 }>
        {/* uncomment and pass required props */ }
        {/* <Map /> */ }
      </MDBox>
    </DashboardLayout>
  )
}

export default Navigation
