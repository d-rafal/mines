import { useLocation } from "react-router-dom";
import { isLocationStateWithFromPropertyPath } from "../@types-and-const/@general";

const useRedirectLocation = (defaultLocation?: string) => {
  const location = useLocation();

  let from = defaultLocation || "/";

  if (isLocationStateWithFromPropertyPath(location.state)) {
    from =
      location.state.from.pathname +
      (location.state.from.search[0] === "?" ? "" : "?") +
      location.state.from.search +
      (location.state.from.hash[0] === "#" ? "" : "#") +
      location.state.from.hash;
  }

  return from;
};

export default useRedirectLocation;
