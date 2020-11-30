/* eslint-disable react/jsx-indent */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* import SearchBox from './components/SearchBox'; */
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';


import ProfileScreen from './screens/ProfileScreen';
import PostListScreen from './screens/PostListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import PostEditScreen from './screens/PostEditScreen copy';
import { signout } from './actions/userActions';

/* import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox'; */

/* import MapScreen from './screens/MapScreen'; */
import PrivateRoute from './components/PrivateRoute';

import AdminRoute from './components/AdminRoute';

import ChatBox from './components/ChatBox';
import SupportScreen from './screens/SupportScreen';
import { listPosts } from './actions/postActions';


function App() {
  const dispatch = useDispatch();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  /* const postList = useSelector((state) => state.postList); */
  /* const { posts, loading, error } = postList; */
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
 /*  const cart = useSelector((state) => state.cart); */
/*   const { cartItems } = cart; */
  const handleSignout = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listPosts());
    return () => {
      //
    };
  }, [dispatch]);


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              className="open-sidebar"
              type="button"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" />
            </button>
            <Link className="brand" to="/">
             My Blog
            </Link>
          </div>
          {/* <div>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div> */}
          <div>
            {/* <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link> */}
            {userInfo ? (
              <div className="dropdown">
                <Link to="/profile">
                  {userInfo.name}{' '}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>

                  <li>
                    <Link to="#signout" onClick={handleSignout}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"> Sign In</Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="/profile">
                  Admin{' '}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/postlist">Posts</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Shopping Categories</strong>
              <button
                type="button"
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
              >
                x
              </button>
            </li>
            {/* {loading ? (
              <li>
                <LoadingBox />
              </li>
            ) : error ? (
              <li>
                <MessageBox variant="error">{error}</MessageBox>
              </li>
            ) : posts.length === 0 ? (
              <li>There is no categories.</li>
            ) : (
              categories.map((x) => (
                <li className="categories-list" key={x}> 
                  <Link
                    onClick={() => setSidebarIsOpen(false)}
                    to={`/search/category/${capitalizeFirstLetter(x)}`}
                  >
                    {capitalizeFirstLetter(x)}
                  </Link>

                </li>
              ))
            )} */}
          </ul>
        </aside>
        <main>
          {/* Customer  */}
 
          <PrivateRoute path="/profile" component={ProfileScreen} />

         {/*  <PrivateRoute path="/map" component={MapScreen} exact /> */}

          {/* Admin  */}
          <AdminRoute path="/postlist" component={PostListScreen} />
          <AdminRoute path="/post/:id/edit" component={PostEditScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />

          <AdminRoute path="/support" component={SupportScreen} />

          <AdminRoute path="/userlist" component={UserListScreen} />


          {/* Public  */}
     {/*      <Route
            path="/search/category/:category/keyword/:keyword/order/:order/min/:min/max/:max/rate/:rate"
            component={SearchScreen}
          />
          <Route
            path="/search/keyword/:keyword?"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category?"
            component={SearchScreen}
            exact
          /> */}
          <Route path="/post/:id" component={PostScreen} exact />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/" exact component={HomeScreen} />
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}

          <div>© 2020 All right reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
