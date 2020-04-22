import React, { useState, useEffect } from 'react';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  NativeSelect,
  FormControl
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Animation } from '@devexpress/dx-react-chart';
import image from '../images/image.png';

const useStyles = makeStyles(theme => ({
  lowerPart: {
    width: '100%',
    flexWrap: 'warp',
  },

  deathCards: {
    borderBottom: '5px orange solid',
  },
  recoveredCards: {
    borderBottom: '5px green solid'
  },
  confirmedCards: {
    borderBottom: '5px blue solid'
  },
  img: {
    width: '370px',
    marginTop: '50px',
  }
}));

function GetValue(props) {
  const classes = useStyles();
  const country = props.country;
  const countries = props.countries;
  const [value, setValue] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    let index = 0;
    countries.forEach(item => {
      if (item.Country === country) {
        setData(countries[index]);
        setValue([
          {
            number: (item.TotalConfirmed),
            name: 'Today\'s Infected',

          },
          {
            number: item.TotalDeaths,
            name: 'Today\'s Deaths',

          },
          {
            number: (item.TotalRecovered),
            name: 'Today\'s Recovered',

          },
        ]);
      }
      index++;
    });
  }, [country, countries]);
  return (
    <Grid container
      alignItems='center'
      justify='space-around'
      spacing={10}
      direction='row'
    >
      <Grid item>
        <Card className={classes.deathCards}>
          <CardContent>
            <Typography variant="h6" className={classes.pos}>
              Total Deaths
            </Typography>
            <Typography variant="h4">
              {data.TotalDeaths}
            </Typography>
            <Typography style={{ color: '#871912', fontWeight: 'bold' }}>
              + {data.NewDeaths} new deaths today
            </Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.recoveredCards}>
          <CardContent>
            <Typography variant="h6" className={classes.pos}>
              Total Recovered
            </Typography>
            <Typography variant="h4">
              {data.TotalRecovered}
            </Typography>
            <Typography style={{ color: '#20820a', fontWeight: 'bold' }}>
              + {data.NewRecovered} new recovered today
            </Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.confirmedCards}>
          <CardContent>
            <Typography variant="h6" className={classes.pos}>
              Total Infected
            </Typography>
            <Typography variant="h4">
              {data.TotalConfirmed}
            </Typography>
            <Typography style={{ color: '#054487', fontWeight: 'bold' }}>
              + {data.NewConfirmed} new infected today
            </Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Grid>
      <Grid item className={classes.lowerPart}>
        <Chart
          data={value}
        >
          <PieSeries
            valueField="number"
            argumentField="name"
            innerRadius={0.4}
            palette="Ocean"
          />

          <Animation />
        </Chart>
      </Grid>
    </Grid>
  );
}
const CountryValue = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const handleCountryChange = (e) => {
    setCountry(e)
  }
  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(data => data.json())
      .then(
        (result) => {
          setCountries(result.Countries)
        },
      )
  }, []);
  return (
    <Grid
      container
      spacing={5}
      justify='center'
      direction='column'
    >
      <Grid item>
        <FormControl>
          <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
            {countries.map((countries, index) => <option key={index} value={countries.Country}>{countries.Country}</option>)}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item>
        <GetValue country={country} countries={countries} />
      </Grid>
    </Grid>
  );
}
export default function MainPage() {
  const classes = useStyles();
  const [finalData, setFinalData] = useState([]);
  const [displayData, setDisplayData] = useState({});
  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(data => data.json())
      .then(
        (result) => {
          setDisplayData(result.Global)
          setFinalData(prevState => ([
            ...prevState,
            {
              number: (result.Global.TotalConfirmed / 1000),
              name: 'Today\'s Infected',

            },
            {
              number: result.Global.TotalDeaths / 1000,
              name: 'Today\'s Deaths',

            },
            {
              number: (result.Global.TotalRecovered / 1000),
              name: 'Today\'s Recovered',

            },
          ]));
        },
      )
  }, []);
  return (
    <Grid
      container
      spacing={6}
      justify='center'
      direction='column'
      alignItems='center'
    >
      <Grid item>
        <img src={image} className={classes.img} alt='dssds' />
      </Grid>
      <Typography variant='h3'>Global Statistics</Typography>
      <Grid item container
        xs={12}
        md={9}
        alignItems='center'
        justify='space-around'
        direction='row'
      >

        <Grid item>
          <Card className={classes.deathCards}>
            <CardContent>
              <Typography variant="h6" className={classes.pos}>
                Total Deaths
            </Typography>
              <Typography variant="h4">
                {displayData.TotalDeaths}
              </Typography>
              <Typography style={{ color: '#871912', fontWeight: 'bold' }}>
                + {displayData.NewDeaths} new deaths today
            </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.recoveredCards}>
            <CardContent>
              <Typography variant="h6" className={classes.pos}>
                Total Recovered
            </Typography>
              <Typography variant="h4">
                {displayData.TotalRecovered}
              </Typography>
              <Typography style={{ color: '#20820a', fontWeight: 'bold' }}>
                + {displayData.NewRecovered} new recovered today
            </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.confirmedCards}>
            <CardContent>
              <Typography variant="h6" className={classes.pos}>
                Total Infected
            </Typography>
              <Typography variant="h4">
                {displayData.TotalConfirmed}
              </Typography>
              <Typography style={{ color: '#054487', fontWeight: 'bold' }}>
                + {displayData.NewConfirmed} new infected today
            </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid item className={classes.lowerPart}>
        <Chart
          data={finalData}
        >
          <PieSeries
            valueField="number"
            argumentField="name"
            innerRadius={0.4}
            palette="Ocean"
          />

          <Animation />
        </Chart>
      </Grid>
      <Grid
        container
        spacing={6}
        justify='center'
        direction='column'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h3'>Regional Statistics</Typography>
        </Grid>
        <Grid item>
          <CountryValue />
        </Grid>
      </Grid>
    </Grid>
  );
}
