import * as actionType from "../action-type/cartActionType";

const initialState = {
  cartItems: [],
  stateChangeNotifyCounter: 1,
  checkBoxValues: {}
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const item = action.payload.item;
      const existItem = state.cartItems.find(
        (product) => product._id === item._id
      );

      if (existItem) {
        return state;
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload.item],
        };
      }

    case actionType.REMOVE_FROM_CART:
      // Create a copy of the current checkbox values without the removed item
      const updatedCheckboxValues = { ...state.checkboxValues };
      delete updatedCheckboxValues[action.payload.id];

      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product._id !== action.payload.id
        ),
        checkboxValues: updatedCheckboxValues
      };

    case actionType.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        checkBoxValues:{}
      };

    case actionType.UPDATE_QTY:
      let index = 0;
      state.cartItems.map((product, i) => {
        if (product._id === action.payload.productId) {
          index = i;
        }
      });
      state.cartItems[index].qty = action.payload.qty;
      return {
        ...state,
        cartItems: state.cartItems,
        stateChangeNotifyCounter: state.stateChangeNotifyCounter + 1,
      };

    case actionType.SET_CART_ITEMS:
      const initialCheckboxValues = {};
      const cartItems = action.payload.cartItems;
      if(cartItems.length == 0){
        initialCheckboxValues = {}
      }

/*
      if (cartItems.length > 0) {
        cartItems.forEach(item => {
          initialCheckboxValues[item._id] = false;
        });
      }
      */

      return {
        ...state,
        cartItems: cartItems,
        //checkboxValues: initialCheckboxValues
      };

    case actionType.UPDATE_CHECKBOX_VALUES:
      const itemId = action.payload.itemid;
      const isChecked = action.payload.isChecked;

      // Only update checkboxValues for items that are in cartItems
      if (state.cartItems.some(item => item._id === itemId)) {
        return {
          ...state,
          checkboxValues: {
            ...state.checkboxValues,
            [itemId]: isChecked
          }
        };
      } else {
        return state; // No change needed for items not in cartItems
      }

    default:
      return state;
  }
};

export default cartReducer;