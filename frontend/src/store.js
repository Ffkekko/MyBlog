import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {
  postListReducer,
  postDetailsReducer,
  postUpdateReducer,
  postDeleteReducer,
  postCommentSaveReducer,
  postCreateReducer,
} from './reducers/postReducers';
/* import { likeReducer } from './reducers/likeReducers'; */
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
  userAddressMapReducer,
  /* sellerReviewSaveReducer, */
} from './reducers/userReducers';


/* const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []; */

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  /* cart: { cartItems, shippingAddress, paymentMethod: 'paypal' }, */
  userSignin: { userInfo },
};
const reducer = combineReducers({
 /*  cart: cartReducer, */
  userAddressMap: userAddressMapReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userSignin: userSigninReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userRegister: userRegisterReducer,
/*   sellerReviewSave: sellerReviewSaveReducer, */
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  postCommentSave: postCommentSaveReducer,
  postCreate: postCreateReducer,
 
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
