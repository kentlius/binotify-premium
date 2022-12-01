import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./pages/root";
import Login, { action as loginAction } from "./pages/login";
import Register, { action as registerAction }from "./pages/register";
import Admin, { loader as adminLoader } from "./pages/admin";
import ErrorPage from "./pages/error-page";
import Song, { loader as songLoader } from "./components/song";
import EditSong, { action as editAction } from "./components/edit";
import { action as destroyAction } from "./components/destroy";
import Index from "./components/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "songs/:songId",
            element: <Song />,
            loader: songLoader,
          },
          {
            path: "songs/:songId/edit",
            element: <EditSong />,
            loader: songLoader,
            action: editAction,
          },
          {
            path: "songs/:songId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register/>,
    action: registerAction,
  },
  {
    path: "/admin",
    element: <Admin/>,
    loader: adminLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
