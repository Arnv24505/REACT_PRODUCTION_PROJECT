// function timelineItem(theme, ownerState) {
//   const { borders } = theme
//   const { lastItem, isDark } = ownerState

//   const { borderWidth, borderColor } = borders

//   return {
//     "&:after": {
//       content: !lastItem && "''",
//       position: "absolute",
//       top: "2rem",
//       left: "17px",
//       height: "100%",
//       opacity: isDark ? 0.1 : 1,
//       borderRight: `${borderWidth[2]} solid ${borderColor}`,
//     },
//   }
// }

// export default timelineItem


function timelineItem(theme, ownerState ) {
  const { borders } = theme
  const { lastItem, isDark, orientation } = ownerState
  const { borderWidth, borderColor } = borders
 
  const commonStyles = {
    content: !lastItem && "''",
    position: "absolute",
    opacity: isDark ? 0.1 : 1,
    borderStyle: `solid`,
    borderWidth: `${borderWidth[2]}`,
    borderColor: borderColor,
  }
 
  const verticalStyles = {
    top: "2rem",
    left: "17px",
    height: "100%",
    borderRightWidth: `1px`, // Adjust for vertical border
  }
 
  const horizontalStyles = {
    top: "1rem", // Center vertically
    left: "8rem",
    width: "100%", // Span the full width
    height: "1px",
    borderBottomWidth: `1px`, // Adjust for horizontal border
  }

  console.log("orientation : ", orientation)

  const styles = {
    "&:after": {
      ...commonStyles,
      ...(orientation === 'vertical' ? verticalStyles : horizontalStyles),
    },
  }
 
  return styles
 }
 
 export default timelineItem
 