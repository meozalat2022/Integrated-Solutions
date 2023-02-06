import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import productReducer from './store/reducers/products';
import categoryReducer from './store/reducers/Categories';
import brandsReducer from './store/reducers/Brands';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import categoryProductsReducer from './store/reducers/categoryProducts';
import promotionsReducer from './store/reducers/promotions';
import selectedProductReducer  from './store/reducers/selectedProduct';
import userReducer from './store/reducers/authUser';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  brands : brandsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  categoryProducts: categoryProductsReducer,
  promoionProducts: promotionsReducer,
  selectedProduct : selectedProductReducer,
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider store={store}>
        <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
