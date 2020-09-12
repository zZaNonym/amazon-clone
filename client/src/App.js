import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Header, Home, Checkout, Login, Payment, Orders } from './components';

import './App.css';
import { useStateValue } from './context/stateProvider';
import { auth } from './firebase';

const promise = loadStripe(
  'pk_test_51HQHMtGqHXpcGo1iRUyAal62Fvelv2DHQ2TacnUJbQqya15WBABeYVypDLiCm624xVChgRBMF5BIb40mgAXG4Lb3009TJN2mLn'
);
function App() {
  const [_, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: 'SET_USER_DATA', payload: authUser });
      } else {
        dispatch({ type: 'SET_USER_DATA', payload: null });
      }
    });
  }, []);
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route exact path='/'>
            <Header />
            <Home />
          </Route>
          <Route exact path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route exact path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
