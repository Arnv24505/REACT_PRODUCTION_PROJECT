// @mui material components
import Card from '@mui/material/Card'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'

// Material Dashboard 2 React example components
import TimelineItem from 'examples/Timeline/TimelineItem'

const OrdersOverview = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <MDBox p={2} >
        <MDBox
          justifyContent='center'
          alignItems='center'
          sx={{ display: 'flex', flexWrap: 'wrap' }}
        >
          <TimelineItem
            color='success'
            icon='analytics'
            title='$2400, Design changes'
            orientation='horizontal'
          />
          <TimelineItem
            color='error'
            icon='inventory_2'
            title='New order #1832412'
            orientation='horizontal'
          />
          <TimelineItem
            color='info'
            icon='shopping_cart'
            title='Server payments for April'
            orientation='horizontal'
          />
          <TimelineItem
            color='warning'
            icon='payment'
            title='New card added for order '
            orientation='horizontal'
          />
          <TimelineItem
            color='primary'
            icon='vpn_key'
            title='New card added for order'
            orientation='horizontal'
            lastItem
          />
        </MDBox>
      </MDBox>
    </Card>
  )
}

export default OrdersOverview
