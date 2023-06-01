import React, { useState } from "react";
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
import Technical_support from "./View/support/technical-support";
import Maps from "./View/maps/Maps";
/* STYLES */
import "./App.css";
import Profile from "./View/profile/Profile";
import ProfileCompany from "./View/profile/ProfileCompany";
import ReportList from "./View/report-list/ReportList";

function App() {
  const [accessToken] = useState(localStorage.getItem("access_token") || "");
  const isLoggedIn = !!accessToken;

  return (
    <div className="App">
      <Router>
        {accessToken && <NavbarVertical />}
        <Switch>
          {!accessToken ? (
            <>
              <Route exact path="/" component={Login} />
              <Route
                exact
                path="/recover-password/"
                component={RecoverPassword}
              />
              <Route exact path="/register" component={Register} />
            </>
          ) : (
            <>
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
                path="/report-list"
                component={ReportList}
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
              <PrivateRoute
                isAuthenticated={isLoggedIn}
                exact
                path="/technical_support"
                component={Technical_support}
              />

              <PrivateRoute
                isAuthenticated={isLoggedIn}
                exact
                path="/maps"
                component={Maps}
              />
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
