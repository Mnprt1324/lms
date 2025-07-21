import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store ,persistor} from "./app/store.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { PersistGate } from 'redux-persist/integration/react';
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <QueryClientProvider client={queryClient}>
        <App />
         <Toaster />
      </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
