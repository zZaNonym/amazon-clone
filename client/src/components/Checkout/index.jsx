import React from 'react';

import { Subtotal, CheckoutProduct } from '../';

import './checkout.scss';
import { useStateValue } from '../../context/stateProvider';

const Checkout = () => {
  const [{ basket }] = useStateValue();
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt='advertisment'
          className='checkout__ad'
        />
        <div>
          <h2 className='checkout__title'>Your shopping Basket</h2>
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
      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
