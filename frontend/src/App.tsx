import React, { useEffect, useState } from 'react';
import './App.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Box, createTheme, Grid, Paper, ThemeProvider, Toolbar } from '@mui/material';
import Modal from "@material-ui/core/Modal";
import Typography from '@mui/material/Typography';
import Basic from './components/BasicDropzone';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import PatientDataTable from './components/PatientDataTable';
import Chart from 'react-apexcharts'

const url = `https://iwhkrwpv22.execute-api.ap-southeast-2.amazonaws.com/predict`

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

  // State hooks for static data
  const [recordID, setRecordID] = useState("")
  const [selectedAge, setSelectedAge] = useState("")
  const [selectedGender, setSelectedGender] = useState("0")
  const [selectedWeight, setSelectedWeight] = useState("")
  const [selectedHeight, setSelectedHeight] = useState("")
  const [selectedICUType, setSelectedICUType] = useState("1")
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const [series, useSeries] = useState([{data: []}])
  const options = {
    title: {text: 'Descriptor Weightings', align: 'center', style: {color: 'white', fontSize: '20px'}},
    xaxis: {categories: categories, labels: {style: {colors: 'white', fontSize: '16px'}}},
    yaxis: {min:0, max:0.1, labels: {
      style: {colors: 'white', fontSize: '14px'},
      formatter: function (val: number) {
      return val.toFixed(2)
    }}, 
    style: {colors: 'white'},
    type: 'numeric',
    tickAmount: 10},
    dataLabels: {enabled: false},

    states: {
      hover: {
          filter: {
              type: 'none',
          }
      },
    }}

  useEffect(() => {
    if (result.length != 0) {
      console.log(result);
      setCategories(result.interpretation.descriptors);
      useSeries([{
        // @ts-ignore
        name: 'Weightings',
        data: result.interpretation.descriptorValues
      }])
      setShowResult(true)
    }
  }, [result])

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
    console.log("Submit Button Clicked")

    // Format the static data
    const payload = []
    payload.push(["00:00", "Age", selectedAge])
    payload.push(["00:00", "Gender", selectedGender])
    payload.push(["00:00", "Height", selectedHeight])
    payload.push(["00:00", "ICUType", selectedICUType])
    payload.push(["00:00", "Weight", selectedWeight])

    // Format the time-series data
    rows.forEach((row: any) => {
      payload.push([row.time, row.parameter, row.value])
    })

    const body = JSON.stringify(payload)

    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }).then((response) => response.json())
    .then((responseJSON) => {
    setResult(responseJSON) 
});
  }

  const renderModal = () => {
    return <Modal
      open={showResult}
      onClose={() => setShowResult(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-graph"
      style={{inset: 50}}
    >
      <Paper style={{overflow: 'scroll', padding: '8px'}}>
        <Typography id="modal-title" variant="h3" component="h2">
          {/* @ts-ignore */}
          <Box style={{margin:'30px'}}>
            Chance of Death: {result.mortalityPercentage}
          </Box>
        </Typography>
        <Typography id="modal-graph"  sx={{ mt: 10 }}>
          {/* @ts-ignore */}
          <Chart options={options} series={series} type='bar' width={1800} height={500} />
        </Typography>
      </Paper>
    </Modal>
  }

  // Table rows for the time-series data
  const [rows, setRows] = useState([]);

  return (
    <ThemeProvider theme={darkTheme}>
      
    <div className="App">
      {result.length != 0 && 
        renderModal()
      }
      <header className="App-header">
      <AppBar position="absolute">
        <Toolbar>
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
        <Grid container maxWidth={1200} px={4} mt={12}>
          <Grid item container sm={3} direction="column" justifyContent="center">
            <TextField id="outlined-basic" label="Patient Record ID" value={recordID} onChange={handleRecordIDChange} variant="outlined" size="medium"/>
          </Grid>
          <Grid item sm={1.5}/>
          <Grid item container sm={4.5} direction="column" justifyContent="center">
            <Basic setRows={setRows} setRecordID={setRecordID} setSelectedAge={setSelectedAge} setSelectedGender={setSelectedGender} setSelectedWeight={setSelectedWeight} setSelectedHeight={setSelectedHeight} setSelectedICUType={setSelectedICUType}/>
          </Grid>
        </Grid>


        <Grid container maxWidth={1200} padding={4}>
          <Grid item container sm={4}>
            <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#212121',
                    boxShadow: 5,
                  }}>
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
        <Grid container maxWidth={1200} mb={4}>
          <Grid item sm={9}/>
          <Grid item container sm={2} direction="column" justifyContent="center" alignItems="flex-end" pr={4}>
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
