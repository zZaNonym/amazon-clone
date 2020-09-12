import React, { useState, useEffect } from 'react';

import { db } from '../../firebase';
import { useStateValue } from '../../context/stateProvider';
import { Order } from '../';
import './orders.scss';

const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              data: { ...doc.data(), id: doc.id },
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className='orders'>
      <h1>Your orders</h1>
      <div className='orders__order'>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
