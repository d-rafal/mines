import { Navigate, useLocation } from "react-router-dom";
import { useSelectLayoutConfig } from "../../app/store/features/layout-config/layoutConfigSlice";

import { getAbsoluteRoute } from "../../routes/getAbsoluteRoute";
import { LAYOUT_SELECTION_ROUTE } from "../../routes/layoutSelectionRoute";

interface RequireLayoutConfigProps {
  readonly children: React.ReactNode;
}

const RequireLayoutConfig = ({ children }: RequireLayoutConfigProps) => {
  const layoutConfig = useSelectLayoutConfig();
  const location = useLocation();

  if (!layoutConfig.length) {
    return (
      <Navigate
        to={getAbsoluteRoute(LAYOUT_SELECTION_ROUTE.path)}
        state={{ from: location }}
        replace={true}
      />
    );
  }
  return <>{children}</>;
};

export default RequireLayoutConfig;
