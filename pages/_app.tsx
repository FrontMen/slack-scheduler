import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider, DataProvider } from '@context/.';
import { theme } from '@context/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>iO onSite Slack Scheduler</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <UserProvider>
        <DataProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </DataProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
