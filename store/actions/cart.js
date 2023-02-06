export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEART_CART = "CLEART_CART";

export const addToCart = (product, quantity) =>{
    return {type: ADD_TO_CART, product: product, newQuantity: quantity};
}

export const removeFromCart = productId => {
    return { type: REMOVE_FROM_CART, pid: productId };
};

export const clearCart = ()=>{
    return{type: CLEART_CART}
}