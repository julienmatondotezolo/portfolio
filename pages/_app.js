import '../styles/globals.scss'
import App from 'next/app';

import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence } from "framer-motion";
import Layout from './components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <ParallaxProvider>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </ParallaxProvider>
    );
  }
}

export default MyApp
