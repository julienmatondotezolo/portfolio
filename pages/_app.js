import '../styles/globals.scss'
import App from 'next/app';
import { AnimatePresence } from "framer-motion";
import Layout from './components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      // <AnimatePresence exitBeforeEnter>
        <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      // </AnimatePresence>
    );
  }
}

export default MyApp
