import React from 'react';

import { Product } from '../';

import './home.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__contaienr'>
        <img
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          className='home__image'
          alt='backgorund-img'
        />
        <div className='home__row'>
          <Product
            id='121212342'
            title='The lean startup'
            price={99.99}
            image='https://m.media-amazon.com/images/I/51WIKlio9qL.jpg'
            raiting={4}
          />
          <Product
            id='121212348'
            title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl'
            price={94.99}
            image='https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg'
            raiting={3}
          />
        </div>
        <div className='home__row'>
          <Product
            id='121212340'
            title='Samsung LC49RG90SSUXEN 49` Curved LED Gaming Monitor'
            price={199.99}
            image='https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg'
            raiting={5}
          />
          <Product
            id='121212347'
            title='Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric'
            price={200}
            image='https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$'
            raiting={4}
          />
          <Product
            id='121212322'
            title='New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)'
            price={90.99}
            image='https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg'
            raiting={4}
          />
        </div>
        <div className='home__row'>
          <Product
            id='1212122355'
            title='Samsung LC49RG90SSUXEN 49` Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440'
            price={29.99}
            image='https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg'
            raiting={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
