import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";

export function links() {
  return [{ rel: "stylesheet", href: "../public/tailwind.css" }];
}
export default function root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Outlet />
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        </Provider>
       
        <ScrollRestoration />
        <Scripts />
        {/* {process.env.NODE_ENV === "development" && <LiveReload />} */}
      </body>
    </html>
  );
}

