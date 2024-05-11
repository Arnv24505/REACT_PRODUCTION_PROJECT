import { Grid } from '@mui/material'
import MDBox from 'components/MDBox'
import SimpleSourceCard from 'examples/Cards/SourceCard/SimpleSourceCard'

const DocSource = ({ setdatapageShow,setDeviceshown,setSelectedFile, setActiveStep }) => {
  const handleClick = (file) => {
    // Perform actions with the selected file from DataPreview
    setActiveStep(1)
    setSelectedFile(file)
    
  }
  const handDatabasebtn = ()=>{
    setActiveStep(1)
    setdatapageShow(true)
  }


  const renderDevice = ()=>{
    setSelectedFile('')
    setActiveStep(1)
    setDeviceshown(true)
  }
  return (
    <MDBox my={ 5 }>
      <Grid container spacing={ 3 } mb={ 1.5 } alignItems='center' justifyContent='center'>
        <Grid item xs={ 12 } md={ 6 } lg={ 3 }>
          <MDBox mb={ 1.5 }>
            <SimpleSourceCard
              icon='weekend'
              label=''
              title='File'
              onClick={ () => handleClick('File') }
            />
          </MDBox>
        </Grid>
        <Grid item xs={ 12 } md={ 6 } lg={ 3 }>
          <MDBox mb={ 1.5 }>
            <SimpleSourceCard
              icon='leaderboard'
              label=''
              title='Device'
              onClick={ () => renderDevice() }
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={ 3 } alignItems='center' justifyContent='center'>
        <Grid item xs={ 12 } md={ 6 } lg={ 3 }>
          <MDBox mb={ 1.5 }>
            <SimpleSourceCard
              icon='store'
              label=''
              title='Network'
              onClick={ () => handleClick('Network') }
            />
          </MDBox>
        </Grid>
        <Grid item xs={ 12 } md={ 6 } lg={ 3 }>
          <MDBox mb={ 1.5 }>
            <SimpleSourceCard
              icon='person_add'
              label=''
              title='Custom'
              onClick={ () => handleClick('Custom') }
            />
          </MDBox>
        </Grid>
        <Grid item xs={ 12 } md={ 6 } lg={ 3 }>
          <MDBox mb={ 1.5 }>
            <SimpleSourceCard
              icon='person_add'
              label=''
              title='Database'
              onClick={ () => handDatabasebtn() }
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  )
}

export default DocSource
