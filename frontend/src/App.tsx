import * as React from 'react';
import './App.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AppBar, Badge, Container, createTheme, Grid, IconButton, Paper, ThemeProvider, Toolbar } from '@mui/material';
import { Label } from '@mui/icons-material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Basic from './components/Basic';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import PatientDataTable from './components/PatientDataTable';


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

  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
      <header className="App-header">
      <AppBar position="absolute" /*open={open}*/>
      <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              // onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                // ...(open && { display: 'none' }),
              }}
            >

            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ICU Project
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">

              </Badge>
            </IconButton>
        </Toolbar>
        </AppBar>
        <Grid container maxWidth={1100}>
          <Grid item container sm={3} direction="column" justifyContent="center">
            <TextField id="outlined-basic" label="Patient Record ID" variant="outlined" size="medium"/>
          </Grid>
          <Grid item sm={1.5}/>
          <Grid item container sm={4.5} direction="column" justifyContent="center">
            <Basic></Basic>
          </Grid>
          <Grid item sm={0.5}/>
          <Grid item container sm={2} direction="column" justifyContent="center">
            <label htmlFor="contained-button-file">
              <Input accept=".txt*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span">
                Import Data
              </Button>
            </label>
          </Grid>
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
                    <TextField label="Age" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
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
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container padding={2} spacing={4}>
                  <Grid item container sm={5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography>Initial Weight</Typography>
                  </Grid>
                  <Grid item sm={7}>
                    <TextField label="Initial Weight" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                  </Grid>
                </Grid>
                <Grid container padding={2} spacing={4}>
                  <Grid item container sm={5} direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography>Initial Height</Typography>
                  </Grid>
                  <Grid item sm={7}>
                    <TextField label="Initial Height" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
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
                      defaultValue="coronary care unit"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="coronary care unit" control={<Radio />} label="Coronary Care Unit" />
                      <FormControlLabel value="cardiac surgery recovery" control={<Radio />} label="Cardiac Surgery Recovery" />
                      <FormControlLabel value="medical icu" control={<Radio />} label="Medical ICU" />
                      <FormControlLabel value="surgical icu" control={<Radio />} label="Surgical ICU" />
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
              {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
              /> */}
              <PatientDataTable>
                
              </PatientDataTable>
            </div>
            </Paper>
          </Grid>
        </Grid>
      </header>
    </div>
    </ThemeProvider>
  )
}

export default App
