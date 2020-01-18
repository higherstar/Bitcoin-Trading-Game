import React, { useState, useEffect } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, Loading, CustomAlert } from 'components/elements';
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
  const [errorShow, setErrorShow] = useState({show: false, message: 'Net Error!', type: 'error'});

  const submit = () => {
    setLoading(true);
    stripe.createToken({
      name: userInfo.name,
    }).then((result) => {
      setPaymentToken({
        id: userInfo._id,
        paymentTokenID: result.token.id,
      }).then(() => {
        setLoading(false);
        history.push('/login');
      });
    }).catch((error) => {
      setErrorShow({show: true, message: error, type: error});
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
      <CustomAlert 
          title={errorShow.message}
          open={errorShow.show}
          handleClose={()=>setErrorShow(false)}
          type={errorShow.type}/>
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
  paymentToken: store.paymentData.paymentToken,
  userInfo: store.userData.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectStripe(CheckoutForm)));
