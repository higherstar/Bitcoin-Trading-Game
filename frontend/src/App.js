import React from 'react';
import { Switch, withRouter, Redirect } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/styles/makeStyles';
import PerfectScrollbar from 'react-perfect-scrollbar';

import PublicRoute from 'routes/PublicRoute';
import HomePage from 'containers/Homepage';
import SignUp from 'containers/SignUp';
import LogIn from 'containers/LogIn';
import BillingUser from 'containers/BillingUser';
import Game from 'containers/Game';
import MainGameScreen from 'containers/Game/main';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    color: theme.palette.base[800],
    height: '100%',
  },
  toolbar: {
    height: 70,
    paddingRight: theme.spacing(3), // keep right padding when drawer closed
    color: theme.palette.base[800],
  },
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  linetop: {
    height: 5,
    width: '100%',
    position: 'absolute',
    top: '14vh',
    backgroundColor: theme.palette.primary.backLineColor
  },
  linemiddle: {
    height: 5,
    width: '100%',
    position: 'absolute',
    top: '16vh',
    backgroundColor: theme.palette.primary.backLineColor
  },
  linebottom: {
    height: 6,
    width: '100%',
    position: 'absolute',
    top: '60vh',
    backgroundColor: theme.palette.primary.backLineBottomColor
  },
  appContent: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(${theme.palette.primary.top}, ${theme.palette.primary.middle}, ${theme.palette.primary.bottom})`,

    '& > .scrollbar-container': {
      width: '100%',
      height: '100%',
    },
  },
}));

const App = (props) => {
  const classes = useStyles();

  return (
    <SnackbarProvider maxSnack={3}>
      <div className={classes.root}>
        <CssBaseline />

        <main className={classes.content}>
          <div className={classes.appContent}>
            <div className={classes.linetop}/>
            <div className={classes.linemiddle}/>
            <div className={classes.linebottom}/>
            <PerfectScrollbar
              options={{
                suppressScrollX: true,
                minScrollbarLength: 50,
              }}
            >
              <Switch>
                <Redirect exact from="/" to="/home" />
                <PublicRoute exact path="/home" component={HomePage} props={props} />
                <PublicRoute exact path="/login" component={LogIn} props={props} />
                <PublicRoute exact path="/signup" component={SignUp} props={props} />
                <PublicRoute exact path="/billing" component={BillingUser} props={props} />
                <PublicRoute exact path="/game" component={Game} props={props} />
                <PublicRoute exact path="/game/main" component={MainGameScreen} props={props} />
                {/* <PrivateRoute exact path="/game/main" component={MainGameScreen} props={props} */}
              </Switch>
            </PerfectScrollbar>
          </div>
        </main>
      </div>
    </SnackbarProvider>
  );
};

export default withRouter(App);
