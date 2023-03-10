import { ADD_TO_CART, REMOVE_FROM_CART, CLEART_CART } from "../actions/cart";

import CartItem from '../../model/Cart_item';
const initialState = {
    items: {},
    totalAmount : 0
};

export default (state = initialState, action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const addedProductNewQuan = action.newQuantity;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;
            if(state.items[addedProduct.id]){

                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + addedProductNewQuan,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice * addedProductNewQuan
                );

            }else{
                updatedOrNewCartItem= new CartItem(
                    addedProductNewQuan, 
                    prodPrice, 
                    prodTitle, 
                    prodPrice * addedProductNewQuan
                    )
            }
            return{
                ...state,
                items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice * addedProductNewQuan
            }

      case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
      case CLEART_CART:
        return {
          items: {},
          totalAmount : 0
        };
    }
    return state;
}