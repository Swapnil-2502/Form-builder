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
import ThemeToggle from "./components/ThemeToggle";

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
      <body className="h-full bg-white dark:bg-gray-900 text-black dark:text-black">
        <Provider store={store}>
          <Outlet />
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
          <header className="p-4 flex justify-end">
              <ThemeToggle />
          </header>
        </Provider>
       
        <ScrollRestoration />
        <Scripts />
        {/* {process.env.NODE_ENV === "development" && <LiveReload />} */}
      </body>
    </html>
  );
}

