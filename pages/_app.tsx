import Head from 'next/head'
import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { TeamProvider } from 'hooks/teamContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title>Limbus Company Team Builder</title>
        <meta name="description" content="Limbus Company Team Builder" />

        <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png"/>
        <link rel="manifest" href="icons/site.webmanifest"/>
        <link rel="mask-icon" href="icons/safari-pinned-tab.svg" color="#5bbad5"/>
        <link rel="shortcut icon" href="icons/favicon.ico"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="msapplication-config" content="icons/browserconfig.xml"/>
        <meta name="theme-color" content="#ffffff"/>

      {/* Worry about this later if doing PWA.
        <link rel="manifest" href="/manifest.json" />
      */}
      </Head>
      <TeamProvider initialState={[]}>
        <Component {...pageProps} />
      </TeamProvider>
    </>
  )
}
