import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import { MusicProvider } from "./context/MusicContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <MusicProvider>
          <App />
        </MusicProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();