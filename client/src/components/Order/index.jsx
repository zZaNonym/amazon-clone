import React from 'react';
import moment from 'moment';
import './order.scss';
import CheckoutProduct from '../CheckputProduct';
import CurrencyFormat from 'react-currency-format';

const Order = ({ order }) => {
  console.log(order);
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map(({ id, title, raiting, image, price }, index) => (
        <CheckoutProduct
          key={id + index}
          id={id}
          title={title}
          raiting={raiting}
          image={image}
          price={price}
          hidenButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className='order__total'>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}></CurrencyFormat>
    </div>
  );
};

export default Order;
