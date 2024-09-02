import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        state.items = [...state.items, action.payload]
    },
    removeFromCart: (state, action) => {
        let newCart = [...state.items];
        let itemIndex = state.items.findIndex(item=> item._id===action.payload.id)
        if(itemIndex>=0){
            newCart.splice(itemIndex,1)
        } else {
            console.log(`Can't remove product as its not in the cart`)
        }
        state.items = newCart;
    },
    emptyCart: (state, action) => {
      state.items = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = state=> state.cart.items;

export const selectCartItemsById = (state, id)=> state.cart.items.filter(item=> item._id == id);

export const selectCartTotal = (state) => {
  const total = state.cart.items.reduce((total, item) => total + item.price, 0);
  return parseFloat(total.toFixed(2));
};

export default cartSlice.reducer