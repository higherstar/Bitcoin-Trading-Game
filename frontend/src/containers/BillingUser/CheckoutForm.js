import React, { useState, useEffect } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, Loading } from 'components/elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPaymentToken } from 'redux/actions/payment';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 300,
  },
  description: {
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
  },
}));

function CheckoutForm(props) {
  const {
    stripe, setPaymentToken, history, userInfo,
  } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('venus----->userInfo', userInfo);
  }, [userInfo]);

  const submit = () => {
    setLoading(true);
    stripe.createToken({
      name: 'Name',
    }).then((result) => {
      setPaymentToken({
        id: userInfo._id,
        paymentTokenID: result.token.id,
      }).then(() => {
        history.push('/login');
      });
      setLoading(false);
    }).catch((error) => {
      console.log('venus----Error', error);
      setLoading(false);
    });
  };

  return (
    <div className={classes.cardInfo}>
      <p className={classes.description}>Please input your payment info.</p>
      <CardElement />
      <div className={classes.buttonGroup}>
        <CustomButton onClick={submit} label="Confirm" />
        {
          loading && <Loading />
        }
      </div>
    </div>
  );
}

CheckoutForm.TypeProps = {
  stripe: PropTypes.func.isRequired,
  paymentToken: PropTypes.object.isRequired,
  setPaymentToken: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPaymentToken,
}, dispatch);

const mapStateToProps = (store) => ({
  paymentToken: store.payment.paymentToken,
  userInfo: store.userData.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectStripe(CheckoutForm)));