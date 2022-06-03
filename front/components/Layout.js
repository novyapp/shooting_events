import Head from "next/head";
import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./Layout.module.css";


export default function Layout({ title, keywords, description, children }) {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={classes.container}>{children}</div>
      <Footer />
    </Fragment>
  );
}

Layout.defaultProps = {
  title: "Shooting Events",
  description: "Find upcoming shooting events",
  keywords: "shooting, events, competitions, ipsc",
};
