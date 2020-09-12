export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => (amount += item.price), 0);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, payload],
      };
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(({ id }) => id === payload);
      const newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id:${payload}) as it isn't in basket!`
        );
      }
      return {
        ...state,
        basket: [...newBasket],
      };
    case 'SET_USER_DATA':
      return { ...state, user: payload };
    case 'EMPTY_BACKET':
      return { ...state, basket: [] };
    default:
      return state;
  }
};

export default reducer;
