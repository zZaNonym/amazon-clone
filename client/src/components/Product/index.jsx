import React from 'react';

import { useStateValue } from '../../context/stateProvider';

import './product.scss';

const Product = ({ id, title, raiting, image, price }) => {
  const [_, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      payload: { id, title, raiting, image, price },
    });
  };
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className='product__raiting'>
        {Array(raiting)
          .fill()
          .map((_, i) => (
            <span key={i}>&#11088;</span>
          ))}
      </div>
      <img src={image} alt='prod-img' className='product__image' />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
