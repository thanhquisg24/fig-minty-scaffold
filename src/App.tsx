import { BrowserRouter } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";
import Routes from "./routes";
import config from "./config";

function App() {
  return (
    <DAppProvider config={config.chainConfig}>
      {/* <Provider store={store}> */}
      <BrowserRouter basename={config.basename}>
        <Routes />
      </BrowserRouter>
      {/* </Provider> */}
    </DAppProvider>
  );
}

export default App;
