import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
  
      <QueryClientProvider client={queryClient}>
        <App />
         <Toaster />
      </QueryClientProvider>

    </Provider>
  </StrictMode>
);
