import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import { CheckoutProduct } from '../';
import { useStateValue } from '../../context/stateProvider';
import axios from '../../axios';
import './payment.scss';

import { getBasketTotal } from '../../context/reducer';
import { db } from '../../firebase';

const Payment = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })
          .then((res) => console.log(res));

        setSucceeded(true);
        setError('');
        setProcessing(false);
        dispatch({ type: 'EMPTY_BACKET' });
        history.replace('/orders');
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  useEffect(() => {
    const getClientSecret = async () => {
      const res = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(res.data.clientSecret);
    };

    basket.length ? getClientSecret() : setClientSecret('');
  }, [basket]);
  console.log(clientSecret);
  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Adress</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Line</p>
            <p>Los Angeles Ca</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(({ id, title, raiting, image, price }, index) => (
              <CheckoutProduct
                key={id + index}
                id={id}
                title={title}
                raiting={raiting}
                image={image}
                price={price}
              />
            ))}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}></CurrencyFormat>
                <button
                  type='submit'
                  disabled={disabled || processing || succeeded}>
                  <span>{processing ? 'Processing' : 'Buy now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
