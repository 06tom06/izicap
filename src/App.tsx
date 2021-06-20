import React, {useEffect, useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import CustomMap from './CustomMap';
import { geolocated, geoPropTypes } from "react-geolocated";
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Venue from './Venue';
import {Shop} from "./Objects";

const drawerWidth = 400;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      height: window.innerHeight - 56
    },
  }),
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

function App(props: Props) {
  const { window} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  const [shops, setShops] = React.useState<Shop[]>([]);


  useEffect(() => {
    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } 
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="search" 
        label="Search" 
        style={{width: "100%"}} 
        variant="outlined" 
        disabled={latitude === 0 || longitude === 0}
        onChange={event => {
          let search = event.target.value;
          axios.get(`https://api.foursquare.com/v2/venues/search?client_id=1JG0XMW312H5GZJWJNDEY2YHUWSOZVEF2PFMZFAWUSCXWWO4&client_secret=0UOE3LE4Y1ENZZBGEW0LBJBRYHKWDJST215YIJOUE4I2UBWL&v=20180323&limit=10&ll=${latitude},${longitude}&query=${search}`)
            .then(res => {
              setShops(res.data.response.venues);
              })
            }
          }
        />
      </form>
      <Divider />
      <List>
        {shops.map((s, index) => {
          return <Venue name={index + 1 + ". " + s.name} address={s.location.address} icon={s.categories && s.categories[0] ? (s.categories[0].icon ? s.categories[0].icon.prefix + "88" + s.categories[0].icon.suffix : "" ): ""}/>
        })
      }
      </List>
      <Divider />
      <List>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Izicap
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {latitude !== 0 && longitude !== 0 && <CustomMap shops={shops} latitude={latitude} longitude={longitude} />}
        {(latitude === 0 || longitude === 0) && <CircularProgress />}
      </main>
    </div>
  );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(App);