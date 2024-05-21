import { BrowserRouter } from "react-router-dom";

import Router from "../src/router/Router";
import { LayoutProvider } from "./pages/context/layoutcontext";
import { ToastProvider } from "./pages/context/toastContext";
export default function App() {
  return (
    <BrowserRouter>
      <link id="theme-css" href={`/themes/soho-light/theme.css`} rel="stylesheet"></link>
      <LayoutProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </LayoutProvider>
    </BrowserRouter>
  );
}
