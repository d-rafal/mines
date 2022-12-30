import { useEffect } from "react";
import { useSelectIntervalID } from "../../app/store/features/game-config/gameConfigSlice";

const ClearIntervalID = () => {
  const intervalID = useSelectIntervalID();

  useEffect(() => {
    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ClearIntervalID;
