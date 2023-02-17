import BoxTokenDetail from "./box-token-detail";
import { SaleChart } from "./sale-chart";

export default function SalesSection() {
  return (
    <section className="inner-page">
      <div className="container values">
        <div className="row">
          <div className="col-md-8">
            {/* <div className="box token-release-chart">
              <img src="/static/img/values-1.png" className="img-fluid" alt="" />
              <h3>Ad cupiditate sed est odio</h3>
              <p>Eum ad dolor et. Autem aut fugiat debitis voluptatem consequuntur sit. Et veritatis id.</p>
            </div> */}
            <div className="box token-release-chart">
              <SaleChart />
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <BoxTokenDetail />
          </div>
        </div>
      </div>
    </section>
  );
}
