/** @format */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";
import Analytics from "./Pages/Home/HomeRoutes/Analytics";
import Items from "./Pages/Home/HomeRoutes/Items";
import Orders from "./Pages/Home/HomeRoutes/Orders";

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
                <Items />
              </ProtectedRoute>
            }
          />

          <Route
            path='orders'
            exact
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path='analytics'
            exact
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
