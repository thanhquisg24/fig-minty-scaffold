/* eslint-disable jsx-a11y/anchor-is-valid */

import Footer from "../../layout/footer";
import Header from "../../layout/header";
import React from "react";

export default function SampleView() {
  return (
    <>
      <Header />
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <section className="breadcrumbs pt-4">
          <div className="container">
            <h2>SAMPLE</h2>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
