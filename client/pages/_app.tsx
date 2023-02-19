import Script from "next/script";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { SnackbarProvider } from "notistack";

import theme from "config/theme";
import { createEmotionCache } from "config";
import { LocationProvider } from "../contexts/locationContext";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&language=en&region=us&callback=Function.prototype`}
      />

      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5} preventDuplicate anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <CssBaseline />
          <SessionProvider session={session}>
            <LocationProvider>
              <Component {...pageProps} />
            </LocationProvider>
          </SessionProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
