// app/providers.tsx
"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from '../store/store'
import { theme } from "@/pages/_app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
    </Provider>
  );
}
