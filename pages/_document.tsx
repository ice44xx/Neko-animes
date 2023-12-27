import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/assets/footer-cat.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&family=Roboto+Slab:wght@300;700&family=Roboto:wght@300;700&display=swap"
          rel="stylesheet"
        ></link>
        <title>Neko Animes</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
