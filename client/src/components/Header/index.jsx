import React from 'react';
import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../../context/stateProvider';
import './header.scss';
import { auth } from '../../firebase';

function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className='header'>
      <Link to='/'>
        <img
          src='https://jordantravers.com/wp-content/uploads/2018/10/Amazon-Logo-1024x373.png'
          alt='logo'
          className='header__logo'
        />
      </Link>

      <div className='header__search'>
        <input className='header__search_input' />
        <SearchIcon className='header__search_icon' />
      </div>
      <div className='header__nav'>
        <Link to={!user && '/login'}>
          <div onClick={handleAuth} className='header__option'>
            <span className='header__option_lineTop'>
              Hello {user ? user.email : 'Guest'}
            </span>
            <span className='header__option_lineBottom'>
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <Link to='/orders'>
          {' '}
          <div className='header__option'>
            <span className='header__option_lineTop'>Returns</span>
            <span className='header__option_lineBottom'>& Orders</span>
          </div>
        </Link>

        <div className='header__option'>
          <span className='header__option_lineTop'>Your</span>
          <span className='header__option_lineBottom'>Prime</span>
        </div>
        <Link to='/checkout'>
          <div className='header__optionBasket'>
            <ShoppingBasketIcon />
            <span className='header__option_lineBottom header__optionBasket_count'>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
