import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import MusicProvider from "./context/MusicContext";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";

import "./styles/variables.css";
import "./styles/global.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <ThemeProvider>

      <AuthProvider>

        <MusicProvider>

          <App />

          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />

        </MusicProvider>

      </AuthProvider>

    </ThemeProvider>

  </BrowserRouter>
);