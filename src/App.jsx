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

/* CONTEXT */
import State from "./context/state";

/* STYLES */
import "./App.css";
import Profile from "./View/profile/Profile";
import ProfileCompany from "./View/profile/ProfileCompany";

function App() {
  const { pathname } = window.location;

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
            <Route path="/home" component={Home} />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/shopping-list"
              component={ShoppingList}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/my-products"
              component={MyProducts}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/create-products"
              component={CreateProduct}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/create-shopping-list"
              component={CreateShoppingList}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/create-branding"
              component={CreateBranding}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/create-product"
              component={CreateProduct}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/wishlist"
              component={Wishlist}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/products"
              component={Products}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/discounts"
              component={Discounts}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/setDiscounts"
              component={SetDiscounts}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/comments"
              component={Comments}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/checkComments"
              component={CheckComments}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/profile-company"
              component={ProfileCompany}
            />
            <PrivateRoute
              isAuthenticated={true}
              exact
              path="/profile-clients"
              component={Profile}
            />
          </Switch>
        </Router>
      </State>
    </div>
  );
}

export default App;
