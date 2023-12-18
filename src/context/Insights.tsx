import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getLocalData, setLocalData } from '../storage';
import { LocalStorageKeys } from '../storage/keys';

type InsightsContextType = {
  seenInsights: string[];
  isInsightSeen: (insightID: string) => boolean;
  insightSeen: (insightID: string) => void;
};

const InsightsContext = createContext<InsightsContextType>({
  seenInsights: [],
  isInsightSeen: () => false,
  insightSeen: () => null,
});

const InsightsProvider = ({ children }) => {
  const [seenInsights, setSeenInsights] = useState([]);

  useEffect(() => {
    (async () => {
      const insights = await getLocalData(LocalStorageKeys.SEEN_INSIGHTS);
      if (insights?.length) {
        setSeenInsights(insights);
      } else {
        setSeenInsights([]);
        setLocalData(LocalStorageKeys.SEEN_INSIGHTS, []);
      }
    })();
  }, []);

  const isInsightSeen = useCallback(
    (insightID: string) => {
      return seenInsights.includes(insightID);
    },
    [seenInsights],
  );

  const insightSeen = useCallback(
    (insightID: string) => {
      setLocalData(LocalStorageKeys.SEEN_INSIGHTS, [
        ...seenInsights,
        insightID,
      ]);
      setSeenInsights(insights => [...insights, insightID]);
    },
    [seenInsights],
  );

  return (
    <InsightsContext.Provider
      value={{
        seenInsights,
        isInsightSeen,
        insightSeen,
      }}
    >
      {children}
    </InsightsContext.Provider>
  );
};

export { InsightsContext, InsightsProvider };
