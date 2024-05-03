import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Header } from "./common/Header/Header.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Register } from "./pages/Register/Register.jsx"
import { Login } from "./pages/Login/Login.jsx"
import Profile from "./pages/Profile/Profile.jsx"

//Redux

import { Provider } from "react-redux"
import store from "./app/store.js"
//Redux Persistence

import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import Post from "./pages/Post/Post.jsx"
import Managment from "./pages/Managment/Managment.jsx"

const persistor = persistStore(store)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} replace />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/managment",
        element: <Managment />,
      },
    ],
  }, // we can add the route that we need
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
