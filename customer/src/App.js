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
      </Routes>
    </div>
  );
}

export default App;
