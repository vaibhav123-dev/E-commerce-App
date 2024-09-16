import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { UserProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Page from "./components/Page.jsx";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-lightbox/style.css";
import "aos/dist/aos.css";
import { SnackbarProvider } from "./context/index.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserProvider>
      <SnackbarProvider>
        <Page>
          <App />
        </Page>
      </SnackbarProvider>
    </UserProvider>
  </Provider>
);
