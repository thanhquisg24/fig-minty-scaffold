import { IVestingHistoryEntity } from "@adapters/entity/VestingHistoryEntity";
import { AppEmitter, REFRESH_DATA } from "@emiter/AppEmitter";
import React from "react";
import { presenter } from "../adapters/presenters/index";

interface IVestingHistoryResult {
  historyData: IVestingHistoryEntity[];
  isLoading: boolean;
}

export function useVestingHistory(userId: number | null): IVestingHistoryResult {
  const [state, setState] = React.useState<IVestingHistoryResult>({
    historyData: [],
    isLoading: false,
  });
  const updateHistory = React.useCallback((_userId: number) => {
    presenter.vestingHistory
      .getVestingHistoryInfo(_userId)
      .then((result) => {
        setState({
          historyData: result,
          isLoading: false,
        });
      })
      .catch(() => {
        setState({
          historyData: [],
          isLoading: false,
        });
      });
  }, []);
  React.useEffect(() => {
    if (userId !== null) {
      setState({
        historyData: [],
        isLoading: true,
      });
      updateHistory(userId);
    }
    return () => {
      setState({
        historyData: [],
        isLoading: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  React.useEffect(() => {
    const listenner = () => {
      if (userId) {
        updateHistory(userId);
      }
    };
    AppEmitter.on(REFRESH_DATA, listenner);
    return () => {
      AppEmitter.off(REFRESH_DATA, listenner);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return { ...state };
}
