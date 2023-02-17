import { BrowserRouter } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";
import { Provider } from "react-redux";
import React from "react";
import Routes from "./routes";
import { appInitAction } from "@store/actions";
import config from "./config";
import { store } from "./store";

store.dispatch(appInitAction());
function App() {
  return (
    <DAppProvider config={config.chainConfig}>
      <Provider store={store}>
        <BrowserRouter basename={config.basename}>
          <Routes />
        </BrowserRouter>
      </Provider>
    </DAppProvider>
  );
}

export default App;
