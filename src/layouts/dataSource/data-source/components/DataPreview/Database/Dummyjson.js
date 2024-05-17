import React from 'react'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'
import MDButton from 'components/MDButton'

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
}

const StyledTextArea = styled(TextareaAutosize)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 400,
  padding: '12px',
  alignItems: 'center',
  borderRadius: '8px', // Rounded corners
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Shadow
  backgroundColor: blue[50], // Blue background color
  border: 'none',
  resize: 'vertical', // Allow vertical resizing
  '&:focus': {
    outline: 'none', // Remove focus outline
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Shadow on focus
  },
})

const formatJsonToTable = (data) => {
  return JSON.stringify(data, null, 2) // Pretty print JSON with 2 spaces indentation
}

const Dummyjson = ({ setdummyJsonshow }) => {

  const handleButton = () => {
    setdummyJsonshow(false)
  }

  // Sample JSON data
  const jsonData = {
    database: {
      type: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Neo4J', 'Oracle'],
      host: 'example-host.com',
      username: 'example-username',
      password: 'example-password',
      name: 'example-database-name',
    },
    person: {
      firstName: 'Jane',
      lastName: 'Doe',
      age: 25,
      email: 'jane@example.com',
      address: {
        street: '456 Oak St',
        city: 'Sometown',
        zipcode: '54321',
      },
      phoneNumbers: ['555-7890', '555-0987'],
      isActive: true,
      hobbies: ['Reading', 'Painting', 'Hiking'],
    },
  }

  return (
    <Container>
      <StyledTextArea
        readOnly={true}
        value={formatJsonToTable(jsonData)}
        style={{ fontFamily: '"Roboto","Helvetica","Arial","sans-serif"', fontSize: '16px', whiteSpace: 'pre-wrap' }}
      />
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <MDButton color='info' variant='contained' onClick={() => { handleButton() }}
                  style={{ height: '1rem', marginTop: '3vh', marginLeft: '2rem' }}>
          Back
        </MDButton>
      </Container>
    </Container>
  )
}

export default Dummyjson
