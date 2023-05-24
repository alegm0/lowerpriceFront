import { PrivateRoute } from "react-private-public-route";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavbarVertical from "./Components/navbar-vertical";

/* VIEWS */
import Home from "./View/HomeIn";
import Login from "./View/login/Login";
import RecoverPassword from "./View/recover-password/RecoverPassword";
import Register from "./View/Register/Register";
import ShoppingList from "./View/shopping-list/ShoppingList";
import CreateShoppingList from "./View/create-shopping-list/CreateShoppingList";
import CreateBranding from "./View/create-branding/CreateBranding";
import CreateProduct from "./View/create-product/CreateProduct";
import Wishlist from "./View/wishlist/Wishlist";
import MyProducts from "./View/my-products/MyProducts";
import Products from "./View/my-products/Products";
import Discounts from "./View/my-products/Discounts";
import SetDiscounts from "./View/my-products/SetDiscounts";
import Comments from "./View/my-products/Comments";
import CheckComments from "./View/my-products/CheckComments";
import ComparisonList from "./View/comparison-list/ComparisonList";

/* CONTEXT */
import State from "./context/state";

/* STYLES */
import "./App.css";
import Profile from "./View/profile/Profile";
import ProfileCompany from "./View/profile/ProfileCompany";

function App() {
  const { pathname } = window.location;
  const accessToken = localStorage.getItem('access_token');
  const isLoggedIn = accessToken ? true : false;

  return (
    <div className="App">
      <State>
        <Router>
          {pathname !== "/" &&
            pathname !== "/recover-password" &&
            pathname !== "/register" && <NavbarVertical />}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/recover-password/" component={RecoverPassword} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute 
              isAuthenticated={isLoggedIn} 
              exact 
              path="/home" 
              component={Home} 
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/shopping-list"
              component={ShoppingList}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/my-products"
              component={MyProducts}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/create-products"
              component={CreateProduct}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/create-shopping-list"
              component={CreateShoppingList}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/create-branding"
              component={CreateBranding}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/create-product"
              component={CreateProduct}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/wish-list"
              component={Wishlist}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/products"
              component={Products}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/discounts"
              component={Discounts}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/setDiscounts"
              component={SetDiscounts}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/comments"
              component={Comments}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/checkComments"
              component={CheckComments}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/profile-company"
              component={ProfileCompany}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/profile-clients"
              component={Profile}
            />
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/comparison-list"
              component={ComparisonList}
            />
          </Switch>
        </Router>
      </State>
    </div>
  );
}

export default App;
