import { PrivateRoute } from "react-private-public-route";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header";

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

/* CONTEXT */
import State from "./context/state";

/* STYLES */
import "./App.css";
import MyProducts from "./View/my-products/MyProducts";

function App() {
  const { pathname } = window.location;

  return (
    <div className="App">
      <State>
        {pathname !== "/" &&
          pathname !== "/recover-password" &&
          pathname !== "/register" && <Header />}
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/recover-password" component={RecoverPassword} />
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
          </Switch>
        </Router>
      </State>
    </div>
  );
}

export default App;
