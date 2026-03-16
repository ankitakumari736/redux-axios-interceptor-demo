import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dasboard/Dashboard";
// import Users from "./pages/Users/UsersPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/layout/Layout";
import ObjectsPage from "./pages/Objects/ObjectsPage";
import Notification from "./components/Notification";
import { lazy, Suspense } from "react";
import Spinner from "./components/ui/Spinner";
import UsersPage from "./pages/Users/UsersPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const ProductsPage = lazy(() => import("./pages/Product/ProductsPage"));
const ProductDetails = lazy(() => import("./pages/Product/ProductDetails"));
const CartPage = lazy(() => import("./pages/cart/CartPage"));
const MoviesPage = lazy(() => import("./pages/movies/MoviesPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Spinner showGlobal />
          </div>
        }
      >
        <Notification />

        <Routes>

          <Route
            path="/"
            element={<
              PublicRoute>
              <Register />
            </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>

                <Layout>
                  <ProductDetails />
                </Layout>
              </ProtectedRoute>

            }
          />

          <Route
            // path="/cart"
            path="/products/card"

            element={
              <ProtectedRoute>

                <Layout>
                  <CartPage />
                </Layout>
              </ProtectedRoute>

            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Layout>
                  <MoviesPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users-table"
            element={
              <ProtectedRoute>
                <Layout>
                  <UsersPage />
                </Layout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
