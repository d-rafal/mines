import { useLocation } from "react-router-dom";
import { isLocationStateWithFromPropertyPath } from "../@types-and-const/@general";

const useRedirectLocation = (defaultLocation?: string) => {
  const location = useLocation();

  let from = defaultLocation || "/";

  if (isLocationStateWithFromPropertyPath(location.state)) {
    from = location.state.from.pathname;

    if (location.state.from.search.length > 1) {
      if (location.state.from.search[0] !== "?") {
        from += "?";
      }
      from += location.state.from.search;
    }

    if (location.state.from.hash.length > 1) {
      if (location.state.from.hash[0] !== "#") {
        from += "#";
      }
      from += location.state.from.hash;
    }
  }

  return from;
};

export default useRedirectLocation;
