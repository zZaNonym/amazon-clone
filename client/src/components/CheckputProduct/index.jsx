import React from 'react';

import './checkoutproduct.scss';
import { useStateValue } from '../../context/stateProvider';

const CheckoutProduct = ({ id, title, raiting, image, price, hidenButton }) => {
  const [_, dispatch] = useStateValue();

  const onRemoveItem = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      payload: id,
    });
  };

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} alt='img-product' />
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__raiting'>
          {Array(raiting)
            .fill()
            .map((_, i) => (
              <span key={i}>&#11088;</span>
            ))}
        </div>
        {!hidenButton && <button onClick={onRemoveItem}>Remove item</button>}
      </div>
    </div>
  );
};

export default CheckoutProduct;
