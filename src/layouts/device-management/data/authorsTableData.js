// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

const data = () => {
  const Job = ({ title, description }) => (
    <MDBox lineHeight={ 1 } textAlign='left'>
      <MDTypography display='block' variant='caption' color='text' fontWeight='medium'>
        { title }
      </MDTypography>
      <MDTypography variant='caption'>{ description }</MDTypography>
    </MDBox>
  )

  return {
    columns: [
      { Header: 'function', accessor: 'function', align: 'left' },
      { Header: 'employed', accessor: 'employed', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],

    rows: [
      {
        function: <Job title='Manager' description='Organization' />,
        employed: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            Edit
          </MDTypography>
        ),
      },
      {
        function: <Job title='Programator' description='Developer' />,
        employed: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            Edit
          </MDTypography>
        ),
      },
      {
        function: <Job title='Executive' description='Projects' />,
        employed: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            Edit
          </MDTypography>
        ),
      },
      {
        function: <Job title='Programator' description='Developer' />,
        employed: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            Edit
          </MDTypography>
        ),
      },
      {
        function: <Job title='Manager' description='Executive' />,
        employed: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            Edit
          </MDTypography>
        ),
      },
      {
        function: <Job title='Programator' description='Developer' />,
        employed: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            14/09/20
          </MDTypography>
        ),
        action: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            Edit
          </MDTypography>
        ),
      },
    ],
  }
}
export default data
