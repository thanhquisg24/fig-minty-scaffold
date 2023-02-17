/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import HistorySection from "./history-section";
import SalesSection from "./sales-section";

export default function HomeView() {
  return (
    <>
      <Header />
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <section className="breadcrumbs pt-4">
          <div className="container">
            <h2>Private Sales</h2>
          </div>
        </section>
        {/* End Breadcrumbs */}
        <SalesSection />
        <HistorySection />
      </main>
      <Footer />
    </>
  );
}
