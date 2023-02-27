import { DrawDropImg } from "./mint/drag-drop-img";
import MintForm from "./mint/mint-form";
import { MintNftContextProvider } from "./mint-context";

export default function MintSection() {
  return (
    <MintNftContextProvider doReloadData={() => {}}>
      <section className="inner-page min-h-700">
        <div className="container values">
          <div className="row">
            <div className="col-md-8">
              {/* <div className="box token-release-chart">
              <img src="/static/img/values-1.png" className="img-fluid" alt="" />
              <h3>Ad cupiditate sed est odio</h3>
              <p>Eum ad dolor et. Autem aut fugiat debitis voluptatem consequuntur sit. Et veritatis id.</p>
            </div> */}
              <div className="box-odd">
                <DrawDropImg />
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
              <MintForm />
            </div>
          </div>
        </div>
      </section>
    </MintNftContextProvider>
  );
}
