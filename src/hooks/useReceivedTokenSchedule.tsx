import { IReceivedTokenScheduleEntity } from "@adapters/entity/ReceivedTokenScheduleEntity";
import { AppEmitter, REFRESH_DATA } from "@emiter/AppEmitter";
import React from "react";
import { presenter } from "../adapters/presenters/index";

interface ITokenScheduleResult {
  scheduleData: IReceivedTokenScheduleEntity[];
  isLoading: boolean;
}

export function useTokenSchedules(userId: number | null): ITokenScheduleResult {
  const [state, setState] = React.useState<ITokenScheduleResult>({
    scheduleData: [],
    isLoading: false,
  });
  const updateSchedules = React.useCallback((_userId: number) => {
    presenter.tokenSchedule
      .getSchedules(_userId)
      .then((result) => {
        setState({
          scheduleData: result,
          isLoading: false,
        });
      })
      .catch(() => {
        setState({
          scheduleData: [],
          isLoading: false,
        });
      });
  }, []);
  React.useEffect(() => {
    if (userId !== null) {
      setState({
        scheduleData: [],
        isLoading: true,
      });
      updateSchedules(userId);
    }
    return () => {
      setState({
        scheduleData: [],
        isLoading: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  React.useEffect(() => {
    const listenner = () => {
      if (userId) {
        updateSchedules(userId);
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
