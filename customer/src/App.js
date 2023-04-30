/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";
import Pizzas from "./Pages/Home/HomeRoutes/Pizzas";
import Desserts from "./Pages/Home/HomeRoutes/Desserts";
import Drinks from "./Pages/Home/HomeRoutes/Drinks";
import Cart from "./Pages/Cart/Cart";
import Confirmation from "./Pages/Confirmation/Confirmation";
import Wishlist from "./Pages/WishList/Wishlist";
import FullItem from "./Pages/FullItem/FullItem";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/home' exact element={<LandingPage />} />
        <Route
          path='/'
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }>
          <Route
            path=''
            exact
            element={
              <ProtectedRoute>
                <Pizzas />
              </ProtectedRoute>
            }
          />

          <Route
            path='desserts'
            exact
            element={
              <ProtectedRoute>
                <Desserts />
              </ProtectedRoute>
            }
          />

          <Route
            path='drinks'
            exact
            element={
              <ProtectedRoute>
                <Drinks />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path='/cart'
          exact
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Confirmation page */}
        <Route
          path='/confirmation'
          exact
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path='/wishlist'
          exact
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path='full/item/:id'
          exact
          element={
            <ProtectedRoute>
              <FullItem />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
