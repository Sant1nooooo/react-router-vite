import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction} from "./routes/root";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import EditContact, {action as editAction} from "./routes/edit";
import {action as destroyAction} from './routes/destroy'
import * as ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import * as React from "react";
import Index from "./routes";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children:[
      {
        errorElement: <ErrorPage />,
        children: [
          {index: true, element: <Index/>},
          { path: "contacts/:contactId", element: <Contact />, loader: contactLoader, action:contactAction},
          { path: "contacts/:contactId/edit", element: <EditContact />, loader: contactLoader, action:editAction},
          { path: "contacts/:contactId/destroy", action:destroyAction, errorElement:<div> There was an error while deleting the user from the contact list</div>},
        ],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);