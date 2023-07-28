// app/providers.tsx
"use client";
import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import theme from "@/theme";
import { AppProvider } from "./appContext";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <CacheProvider>
        <AppProvider>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </AppProvider>
      </CacheProvider>
    </Provider>
  );
};

export default Providers;
