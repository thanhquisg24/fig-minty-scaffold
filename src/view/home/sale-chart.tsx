import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";
import React from "react";
import { STATUS_ENUM } from "@adapters/entity/status-enum";
import { getUserInfoSelector } from "@store/selector";
import moment from "moment";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { useTokenSchedules } from "@hooks/useReceivedTokenSchedule";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    interaction: {
      intersect: false,
      axis: "x",
    },
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

// const labels = ["", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5"];

const claimLineTemplate = {
  label: "Unlocked",
  data: [0, 2000, 4000, 6000, undefined, undefined],
  borderColor: "rgb(53, 162, 235)",
  backgroundColor: "rgba(53, 162, 235, 0.5)",
  fill: false,
  stepped: true,
};
const lockLineTemplate = {
  label: "Locked",
  data: [undefined, undefined, undefined, 6000, 10000, 12000],
  borderColor: "rgb(104, 107, 105)",
  backgroundColor: "rgba(104, 107, 105, 0.5)",
  fill: false,
  stepped: true,
};
// const dataTemplate = {
//   labels,
//   datasets: [claimLineTemplate, lockLineTemplate],
// };

export function SaleChart() {
  const userData = useAppSelector(getUserInfoSelector);
  const shedules = useTokenSchedules(userData ? userData.id : null);

  const dataChart = React.useMemo(() => {
    const _labels = [""];
    const dataClaimed: any = [0];
    const dataLocked: any = [];
    const releaseStep = userData ? userData.vestingLogic : "M";
    const releaseStepMask = releaseStep.slice(-1);
    if (shedules.scheduleData.length > 0) {
      let prevClaim = 0;
      let prevLock = 0;
      const startDate = moment(shedules.scheduleData[0].receivedDate);
      for (let index = 0; index < shedules.scheduleData.length; index++) {
        const element = shedules.scheduleData[index];
        prevLock += Number(element.amount);
        if (element.status === STATUS_ENUM.SETTLED) {
          prevClaim += Number(element.amount);
          dataClaimed.push(prevClaim);
          dataLocked.push(undefined);
        }
        if (element.status === STATUS_ENUM.PENDING) {
          if (index > 0 && shedules.scheduleData[index - 1].status === STATUS_ENUM.SETTLED) {
            dataLocked.push(prevClaim);
          }
          dataLocked.push(prevLock);
          dataClaimed.push(undefined);
        }
        const endDate = moment(element.receivedDate);
        let diffNum = 0;
        let defaultEndMaskLabel = "Month";
        switch (releaseStepMask) {
          case "d":
            diffNum = endDate.diff(startDate, "days");
            defaultEndMaskLabel = "Day";
            break;
          case "y":
            diffNum = endDate.diff(startDate, "years");
            defaultEndMaskLabel = "Year";
            break;
          default: //M
            diffNum = endDate.diff(startDate, "months");
            defaultEndMaskLabel = "Month";
            break;
        }
        _labels.push(`${defaultEndMaskLabel} ${diffNum > 0 ? diffNum : 1}`);
      }
    }

    const isEmptyClaim = dataClaimed.reduce((store: boolean, cur: undefined | number) => {
      if (cur && cur > 0) {
        // eslint-disable-next-line no-param-reassign
        store = false;
      }
      return store;
    }, true);

    const isEmptyLocked = dataLocked.reduce((store: boolean, cur: undefined | number) => {
      if (cur && cur > 0) {
        // eslint-disable-next-line no-param-reassign
        store = false;
      }
      return store;
    }, true);

    let combinDataSet = [];
    if (isEmptyClaim) {
      dataLocked.unshift(0);
      const lineLocked = { ...lockLineTemplate, data: dataLocked };
      combinDataSet = [lineLocked];
    } else if (isEmptyLocked) {
      const lineClaim = { ...claimLineTemplate, data: dataClaimed };
      combinDataSet = [lineClaim];
    } else {
      const lineLocked = { ...lockLineTemplate, data: dataLocked };
      const lineClaim = { ...claimLineTemplate, data: dataClaimed };
      combinDataSet = [lineClaim, lineLocked];
    }

    const newDataChart = { labels: _labels, datasets: combinDataSet };
    return newDataChart;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shedules.scheduleData]);
  return <Line options={options} data={dataChart} />;
}
