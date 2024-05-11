import React, { useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import Button from '@mui/material/Button';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
const CustomList = ({selectedFields,setselectedFields, tableName, totalTables, selectedTable, setbtnShow }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  // table fields 
  const [checked, setChecked] = React.useState([0]);
  // const [selectedFields, setselectedFields] = useState([])
  const [fieldCheck, setFieldcheck] = useState(false)
  const [addChecked, setaddChecked] = useState([])
  const [addedField, setaddedField] = useState([])
  const showNextbtn = () => {
    setbtnShow(true)
  }
  const setCheck = () => {
    setFieldcheck(!fieldCheck)
  }
  const handleSelectionFields = (field) => {
    if (!selectedFields.includes(field)) {
      const updatedFields = [...selectedFields, field];

      // Create a new array with the new field
      setselectedFields(updatedFields); // Update the state with the new array
    } else {
      console.log("Value already exists in selectedFields array");
    }
  }

  const handleFieldClick = (field) => {
    // Toggle the selected state for the clicked field
    setaddChecked(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));

    // If the field is not in the addedField array, add it
    if (!addedField.includes(field)) {
      setaddedField(prevState => [...prevState, field]);
    } else {
      // If the field is already in the addedField array, remove it
      setaddedField(prevState => prevState.filter(item => item !== field));
    }
  };

  const handleAddbtn = () => {
    // Deselect all selected fields in the table fields
    setaddChecked({});
    // Add only unique fields to selectedFields
    setselectedFields(prevSelectedFields => {
      const uniqueFields = [...new Set([...prevSelectedFields, ...addedField])];
      return uniqueFields;
    });
    setaddedField([]); // Clear addedField after adding its contents to selectedFields
  };



  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setbtnShow(true)
  };
  const RemoveFields = () => {
    const updatedFields = selectedFields.filter((field) => !checked[field]);
    setselectedFields(updatedFields);
  };




  const theme = useTheme();
  const newText = useMediaQuery(theme.breakpoints.up('xl'))
  const newText2 = useMediaQuery(theme.breakpoints.up('lg'))
  const newText3 = useMediaQuery(theme.breakpoints.up('md'))
  const newText4 = useMediaQuery(theme.breakpoints.up('sm'))
  const newText5 = useMediaQuery(theme.breakpoints.up('xs'))
  return (
    <>
      <Box sx={{
        width: !newText3 ? '70vw' : '25vw',
        border: "1px solid lightgray",
        height: "25vh",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}>
        <MDTypography sx={{ marginTop: "1rem" }} component='a' href='#' variant='h6' color='text' fontWeight='medium'>{tableName} Fields</MDTypography>
        <Box sx={{ flex: 1, overflowY: "auto", width: "100%" }}>
          <List sx={{ width: '100%', maxWidth: 360, }}>
            {totalTables.map((table, index) => {
              const labelId = `checkbox-list-label-${table}`;
              return (
                <React.Fragment key={index}>
                  {selectedTable === table.name && table.fields.map((field, fieldIndex) => (
                    <ListItemButton
                      key={fieldIndex}
                      onClick={() => {
                        handleFieldClick(field);
                        setaddChecked({ ...addChecked, [field]: !addChecked[field] });
                      }}
                      dense
                      selected={addChecked[field]}
                    >

                      <MDTypography color="secondary" component='a' href='#' variant='h6' fontWeight='light'>{field}</MDTypography>
                    </ListItemButton>

                  ))}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Box>
      <Box>
        <MDButton color='success' onClick={() => { handleAddbtn() }} >
          <Icon sx={{ color: 'inherit' }}>add</Icon>
          Add
        </MDButton>
        <Box>
          <MDButton onClick={() => RemoveFields()} color='error' sx={{ marginTop: "1rem", width: "6rem" }}>
            <Icon sx={{ color: 'inherit', }}>delete</Icon>
            Remove
          </MDButton>
        </Box>

      </Box>

      <Box sx={{ width: !newText3 ? '70vw' : '25vw', border: "1px solid lightgray", display: "flex", flexDirection: "column", height: "25vh", justifyContent: "center", textAlign: "center" }}>
        <MDTypography sx={{ marginTop: "1rem" }} component='a' href='#' variant='h6' color='text' fontWeight='medium'>Selected Fields</MDTypography>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <List sx={{ width: '100%', maxWidth: 360, }}>
            {selectedFields.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={index}
                  sx={{ margin: "0.4rem" }}
                  disablePadding
                >
                  <ListItemButton dense
                    selected={checked[value]}
                    onClick={() => setChecked({ ...checked, [value]: !checked[value] })}
                  >
                    <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='light'>{value}</MDTypography>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

        </Box>
      </Box>



    </>
  )
}

export default CustomList
