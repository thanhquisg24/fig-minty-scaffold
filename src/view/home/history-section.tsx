import { getTokenSymbolSelector, getUserIdSelector } from "@store/selector";

import { FIG_CHAIN } from "../../config";
import { IVestingHistoryEntity } from "@adapters/entity";
import MoneyComponent from "@components/MoneyComponent";
import { formatShortTx } from "@utils/text-format";
import { formatTxDate } from "@utils/date-format";
import { useAppSelector } from "../../hooks/useReduxToolKit";
import { useVestingHistory } from "@hooks/useVestingHistory";

function HistoryTable(props: { data: IVestingHistoryEntity[]; tokenSymbol: string }) {
  const { data, tokenSymbol } = props;
  return (
    <table className="table claim-history">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Txn Hash</th>
          <th scope="col">Quantity</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <a href={FIG_CHAIN.getExplorerTransactionLink(item.txId)} target="_blank" rel="noreferrer">
                {formatShortTx(item.txId)}
              </a>
            </td>
            <td>
              <MoneyComponent numValue={item.amount} /> {tokenSymbol}
            </td>
            <td>
              <a href={FIG_CHAIN.getExplorerAddressLink(item.fromAddress)} target="_blank" rel="noreferrer">
                {formatShortTx(item.fromAddress)}
              </a>
            </td>
            <td>
              <a href={FIG_CHAIN.getExplorerAddressLink(item.fromAddress)} target="_blank" rel="noreferrer">
                {formatShortTx(item.toAddress)}
              </a>
            </td>
            <td>{formatTxDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function HistorySection() {
  const userId = useAppSelector(getUserIdSelector);
  const vestingHistory = useVestingHistory(userId);
  const tokenSymbol: string = useAppSelector(getTokenSymbolSelector);
  return (
    <section className="inner-page section-even-bg">
      <div className="container">
        <header className="section-header">
          <p>Claim History</p>
          {vestingHistory.historyData.length === 0 && <h2 className="mt-2">No record</h2>}
        </header>
        <div className="row">
          {vestingHistory.historyData.length > 0 && (
            <div className="col-md-12">
              <HistoryTable data={vestingHistory.historyData} tokenSymbol={tokenSymbol} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
