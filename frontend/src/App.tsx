import React, { useState } from 'react';
import './App.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Badge, createTheme, Grid, IconButton, Paper, ThemeProvider, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Basic from './components/BasicDropzone';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import PatientDataTable from './components/PatientDataTable';
import axios from 'axios';


const url = `https://8urzwwef10.execute-api.ap-southeast-2.amazonaws.com/predict`
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}


function App() {
  const Input = styled('input')({
    display: 'none',
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const drawerWidth: number = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const [recordID, setRecordID] = useState("")
  const [selectedAge, setSelectedAge] = useState("")
  const [selectedGender, setSelectedGender] = useState("0")
  const [selectedWeight, setSelectedWeight] = useState("")
  const [selectedHeight, setSelectedHeight] = useState("")
  const [selectedICUType, setSelectedICUType] = useState("1")

  const handleRecordIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordID(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAge(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender((event.target as HTMLInputElement).value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeight(event.target.value);
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHeight(event.target.value);
  };

  const handleICUTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedICUType((event.target as HTMLInputElement).value);
  };

  const handleSubmitButtonClick = () => {
    console.log("Submit clicked")

    // Format the static data
    const payload = []
    payload.push(["00:00", "Age", selectedAge])
    payload.push(["00:00", "Gender", selectedGender])
    payload.push(["00:00", "Height", selectedHeight])
    payload.push(["00:00", "ICUType", selectedICUType])
    payload.push(["00:00", "Weight", selectedWeight])

    // Format the time-series data
    rows.forEach((row) => {
      payload.push([row.time, row.parameter, row.value])
    })

    const body = JSON.stringify(payload)
    console.log(body)
    // axios.post(url, {'body': body}, config)
    // .then((res)=>{
    //   console.log("The Response:")
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  }

  const [rows, setRows] = useState([
    { id: 1, time: '00:00', parameter: 'Albumin', value: '1' },
    { id: 2, time: '00:00', parameter: 'ALP', value: '1' },
    { id: 3, time: '00:00', parameter: 'ALT', value: '2' },
    { id: 4, time: '00:00', parameter: 'AST', value: '3.2' },
    { id: 5, time: '00:00', parameter: 'Cholesterol', value: '1' },
    { id: 6, time: '01:45', parameter: 'HCT', value: null },
    { id: 7, time: '01:45', parameter: 'FiO2', value: '23' },
    { id: 8, time: '01:45', parameter: 'HCO3', value: '15' },
    { id: 9, time: '01:45', parameter: 'Platelets', value: '1' },
    { id: 10, time: '03:15', parameter: 'FiO2', value: '23'},
    { id: 11, time: '03:15', parameter: 'HCO3', value: '15' },
    { id: 12, time: '03:15', parameter: 'Platelets', value: '1' },
  ]);


  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
      <header className="App-header">
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
          >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            ICU Project
          </Typography>
        </Toolbar>
      </AppBar>
        <Grid container maxWidth={1100}>
          <Grid item container sm={3} direction="column" justifyContent="center">
            <TextField id="outlined-basic" label="Patient Record ID" value={recordID} onChange={handleRecordIDChange} variant="outlined" size="medium"/>
          </Grid>
          <Grid item sm={1.5}/>
          <Grid item container sm={4.5} direction="column" justifyContent="center">
            <Basic rows={rows} setRows={setRows} setRecordID={setRecordID} setSelectedAge={setSelectedAge} setSelectedGender={setSelectedGender} setSelectedWeight={setSelectedWeight} setSelectedHeight={setSelectedHeight} setSelectedICUType={setSelectedICUType}/>
          </Grid>
          <Grid item sm={0.5}/>
          {/* <Grid item container sm={2} direction="column" justifyContent="center">
            <label htmlFor="contained-button-file">
              <Input accept=".txt*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span">
                Import Data
              </Button>
            </label>
          </Grid> */}
        </Grid>
        <br/>

        <Grid container maxWidth={1200} padding={4}>
          <Grid item container sm={4} /*border={2}*/>
            <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#212121',
                    boxShadow: 5,
                  }}>
              <form noValidate autoComplete="off"> 
                <Grid container padding={2} spacing={4}>
                  <Grid item container sm={5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography>Age</Typography>
                  </Grid>
                  <Grid item sm={7}>
                    <TextField value={selectedAge} onChange={handleAgeChange} label="Age" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                  </Grid>
                </Grid>
                <Grid container padding={2} spacing={4}>
                  <Grid item container sm={5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography>Gender</Typography>
                  </Grid>
                  <Grid item sm={7}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={selectedGender}
                        onChange={handleGenderChange}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="0" control={<Radio />} label="Female" />
                        <FormControlLabel value="1" control={<Radio />} label="Male" />
                        <FormControlLabel value="-1" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container padding={2} spacing={4}>
                  <Grid item container sm={5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography>Initial Weight</Typography>
                  </Grid>
                  <Grid item sm={7}>
                    <TextField label="Initial Weight" value={selectedWeight} onChange={handleWeightChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                  </Grid>
                </Grid>
                <Grid container padding={2} spacing={4}>
                  <Grid item container sm={5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography>Initial Height</Typography>
                  </Grid>
                  <Grid item sm={7}>
                    <TextField label="Initial Height" value={selectedHeight} onChange={handleHeightChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                  </Grid>
                </Grid>
                
                <Grid container padding={2} spacing={4}>
                  <Grid item container sm={5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography>ICU Type</Typography>
                  </Grid>
                  <Grid item sm={7}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={selectedICUType}
                      onChange={handleICUTypeChange}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Coronary Care Unit" />
                      <FormControlLabel value="2" control={<Radio />} label="Cardiac Surgery Recovery" />
                      <FormControlLabel value="3" control={<Radio />} label="Medical ICU" />
                      <FormControlLabel value="4" control={<Radio />} label="Surgical ICU" />
                    </RadioGroup>
                  </FormControl>
                  </Grid>
                </Grid>
                
              </form>
            </Paper>
          </Grid>
          <Grid item sm={0.5}/>
          <Grid item sm={6.5}>
            <Paper sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#212121',
                      boxShadow: 5,
                    }}>
            <div style={{ height: 650, width: '100%' }}>
              <PatientDataTable rows={rows} setRows={setRows}/>
            </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={9}/>
          <Grid item container sm={2} direction="column" justifyContent="center">
              <label htmlFor="contained-button-file">
                <Button variant="contained" onClick={handleSubmitButtonClick} component="span">
                  Submit Data
                </Button>
              </label>
          </Grid>
        </Grid>
      </header>
    </div>
    </ThemeProvider>
  )
}

export default App
