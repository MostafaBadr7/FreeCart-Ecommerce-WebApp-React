import "./App.css";
import Layout from "./Components/Layout/Layout";
// import Cart from "./Components/Cart/Cart";
import Product from "./Components/Product/Product";
// import Brands from "./Components/Brands/Brands";
// import Categories from "./Components/Categories/Categories";
import Home from "./Components/Home/Home";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
// import Notfound from "./Components/Notfound/Notfound";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import CounterContextProvider from "./Components/CounterContext/CounterContext";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./Components/ProtectedRoute/AuthProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
// import CheckoutDetails from "./Components/CheckoutDetails/CheckoutDetails";
// import AllOrders from "./Components/AllOrders/AllOrders";
import ProfileContextProvider from "./Contexts/ProfileContextProvider";
import { Provider } from "react-redux";
import PaginationNav from "./Components/paginationNav/paginationNav";
// import UserProfile from "./Components/UserProfile/UserProfile";
// import UserInfo from "./Components/UserInfo/UserInfo";
import Loading from "./Components/Loading/Loading";
import { Suspense, lazy } from "react";
import SearchResults from "./Components/SearchResults/SearchResults";
import OneCategory from "./Components/OneCategory/OneCategory";
// import { Gstore } from "./Redux/store";

const Notfound = lazy(() => import("./Components/Notfound/Notfound"));
const AllOrders = lazy(() => import("./Components/AllOrders/AllOrders"));
const CheckoutDetails = lazy(() =>
  import("./Components/CheckoutDetails/CheckoutDetails")
);
const Categories = lazy(() => import("./Components/Categories/Categories"));
const Brands = lazy(() => import("./Components/Brands/Brands"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const UserProfile = lazy(() => import("./Components/UserProfile/UserProfile"));
const UserInfo = lazy(() => import("./Components/UserInfo/UserInfo"));

function App() {
  const router = createHashRouter([
    {
      path: "/Login",
      element: (
        <AuthProtectedRoute>
          <Login />
        </AuthProtectedRoute>
      ),
    },
    {
      path: "Register",
      element: (
        <AuthProtectedRoute>
          <Register />
        </AuthProtectedRoute>
      ),
    },
    { path: "/login/:accesToken", element: <Login /> },
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "Home", element: <Home /> },
        { path: "", element: <Navigate to="Home" /> },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            </ProtectedRoute>
          ),
          children: [
            {
              path: "Address",
              element: (
                <ProtectedRoute>
                  <CheckoutDetails />
                </ProtectedRoute>
              ),
            },
          ],
        },
        { path: "Product", element: <PaginationNav /> },
        {
          path: "Categories",
          element: (
            <Suspense fallback={<Loading />}>
              <Categories />
            </Suspense>
          ),
        },
        {
          path: "Brands",
          element: (
            <Suspense fallback={<Loading />}>
              <Brands />
            </Suspense>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "Category/:id",
          element: <OneCategory />,
        },
        { path: "Address/:id", element: <CheckoutDetails /> },
        { path: "/access_token=:accessToken/*", element: <Login /> },
        { path: "/Search/:SearchKey", element: <SearchResults /> },
        {
          path: "/UserProfile",
          element: (
            <Suspense fallback={<Loading />}>
              <UserProfile />
            </Suspense>
          ),
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<Loading />}>
                  <UserInfo />
                </Suspense>
              ),
            },
            {
              path: "AllOrders",
              element: (
                <Suspense fallback={<Loading />}>
                  <AllOrders />
                </Suspense>
              ),
            },
            {
              path: "Cart",
              element: (
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<Loading />}>
              <Notfound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      {/* <Provider store={Gstore}></Provider> */}
      <div className="App ">
        <ProfileContextProvider>
          <AuthContextProvider>
            <CounterContextProvider>
              <RouterProvider router={router}></RouterProvider>
            </CounterContextProvider>
          </AuthContextProvider>
        </ProfileContextProvider>
        <ToastContainer theme="colored" autoClose={700} />
      </div>
    </>
  );
}

export default App;
