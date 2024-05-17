// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // prop-types is a library for typechecking of props
// import PropTypes from "prop-types"

// // @mui material components
// import Icon from "@mui/material/Icon"

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox"
// import MDTypography from "components/MDTypography"

// // Timeline context
// import { useTimeline } from "examples/Timeline/context"

// // Custom styles for the TimelineItem
// import timelineItem from "examples/Timeline/TimelineItem/styles"

// function TimelineItem({ color, icon, title, dateTime, description, lastItem }) {
//   const isDark = useTimeline()

//   return (
//     <MDBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
//       <MDBox
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         bgColor={color}
//         color="white"
//         width="2rem"
//         height="2rem"
//         borderRadius="50%"
//         position="absolute"
//         top="8%"
//         left="2px"
//         zIndex={2}
//         sx={{ fontSize: ({ typography: { size } }) => size.sm }}
//       >
//         <Icon fontSize="inherit">{icon}</Icon>
//       </MDBox>
//       <MDBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
//         <MDTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
//           {title}
//         </MDTypography>
//         <MDBox mt={0.5}>
//           <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
//             {dateTime}
//           </MDTypography>
//         </MDBox>
//         <MDBox mt={2} mb={1.5}>
//           {description ? (
//             <MDTypography variant="button" color={isDark ? "white" : "dark"}>
//               {description}
//             </MDTypography>
//           ) : null}
//         </MDBox>
//       </MDBox>
//     </MDBox>
//   )
// }

// // Setting default values for the props of TimelineItem
// TimelineItem.defaultProps = {
//   color: "info",
//   lastItem: false,
//   description: "",
// }

// // Typechecking props for the TimelineItem
// TimelineItem.propTypes = {
//   color: PropTypes.oneOf([
//     "primary",
//     "secondary",
//     "info",
//     "success",
//     "warning",
//     "error",
//     "dark",
//     "light",
//   ]),
//   icon: PropTypes.node.isRequired,
//   title: PropTypes.string.isRequired,
//   dateTime: PropTypes.string.isRequired,
//   description: PropTypes.string,
//   lastItem: PropTypes.bool,
// }

// export default TimelineItem

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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Icon from '@mui/material/Icon'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Timeline context
import { useTimeline } from 'examples/Timeline/context'

// Custom styles for the TimelineItem
import timelineItem from 'examples/Timeline/TimelineItem/styles'

function TimelineItem ({ color, icon, title, description, lastItem, orientation }) {
  const isDark = useTimeline()
  const isVertical = orientation === 'vertical'
  const iconBox = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      bgColor={color}
      color='white'
      width='2rem'
      height='2rem'
      borderRadius='50%'
      position={isVertical ? 'absolute' : 'static'}
      top={isVertical ? '8%' : 'auto'}
      left={isVertical ? '2px' : 'auto'}
      zIndex={isVertical ? 2 : 'auto'}
      sx={{
        fontSize: ({ typography: { size } }) => size.sm,
        ...(isVertical && { zIndex: 2 }), // Ensure proper z-index for vertical orientation
      }}
    >
      <Icon fontSize='inherit'>{icon}</Icon>
    </MDBox>
  )

  return (
    <MDBox position='relative' mb={0} sx={(theme) => timelineItem(theme, { lastItem, isDark, orientation })}>
      {isVertical ? (
        <>
          {iconBox}
          {/* Description */}
          <MDBox
            ml={5.75}
            pt={description ? 0.7 : 0.5}
            lineHeight={0}
            width='20rem'>
            <MDTypography
              variant='button'
              fontWeight='medium'
              color={isDark ? 'white' : 'dark'}>
              {title || '\u00A0'} {/* Add non-breaking space if title is undefined or empty */}
            </MDTypography>
            <MDBox
              mt={2}
              mb={1.5}>
              {description && (
                <MDTypography
                  variant='button'
                  color={isDark ? 'white' : 'dark'}>
                  {description}
                </MDTypography>
              )}
            </MDBox>
          </MDBox>
        </>
      ) : (
        <MDBox
          position='relative'
          display='flex'
          flexDirection='column'
          ml='2rem'
          zIndex={1}
          width={'12rem'}
          alignItems='center'
        >
          {iconBox}
          {/* Description */}
          <MDTypography
            mt={1}
            variant='button'
            fontWeight='medium'
            color={isDark ? 'white' : 'dark'}>
            {title || '\u00A0'} {/* Add non-breaking space if title is undefined or empty */}
          </MDTypography>
          {description && (
            <MDTypography
              variant='button'
              color={isDark ? 'white' : 'dark'}>
              {description}
            </MDTypography>
          )}
        </MDBox>
      )}
    </MDBox>
  )
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: 'info',
  lastItem: false,
  description: '',
  orientation: 'vertical',
}

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light',
  ]),
  orientation: PropTypes.oneOf([
    'vertical',
    'horizontal',
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
}

export default TimelineItem
