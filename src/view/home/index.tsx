import Footer from "../../layout/footer";
import Header from "../../layout/header";
import MintSection from "./mint-section";

export default function HomeView() {
  return (
    <>
      <Header />
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <section className="breadcrumbs pt-4">
          <div className="container">
            <h2>Let&apos;s Mint Your Nft</h2>
          </div>
        </section>
        {/* End Breadcrumbs */}
        <MintSection />
      </main>
      <Footer />
    </>
  );
}
