import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    background: theme.palette.base.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function BillingUser() {
  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_STRIPE_PUBLISHIABLE_KEY;
  return (
    <div className={classes.container}>
      <StripeProvider apiKey={API_KEY}>
        <div className={classes.container}>
          <h1>Payment Info</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    </div>
  );
}

export default BillingUser;
