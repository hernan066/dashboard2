import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { AppRouter } from "./router/AppRouter";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [theme, colorMode] = useMode();
  const user = JSON.parse(localStorage.getItem("persist:root"))?.auth
  const currentUser = user && JSON.parse(user).user;
  const TOKEN = currentUser?.token;
  console.log(TOKEN)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;
