import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import RequireLayoutConfig from "../components/requireLayoutConfig/RequireLayoutConfig";
import CustomLayoutSelection from "../pages/custom-layout-selection/CustomLayoutSelection";
import Game from "../pages/game/Game";
import LayoutSelection from "../pages/layout-selection/LayoutSelection";
import { CUSTOM_LAYOUT_SELECTION_ROUTE } from "./customLayoutSelectionRoute";
import { LAYOUT_SELECTION_ROUTE } from "./layoutSelectionRoute";
import { ROOT_ROUTE } from "./rootRoute";

const NoMatch = lazy(() => import("../pages/no-match/NoMatch"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROOT_ROUTE.path} element={<Layout />}>
        <Route
          index
          element={
            <RequireLayoutConfig>
              <Game />
            </RequireLayoutConfig>
          }
        />
        <Route
          path={LAYOUT_SELECTION_ROUTE.path}
          element={<LayoutSelection />}
        />
        <Route
          path={CUSTOM_LAYOUT_SELECTION_ROUTE.path}
          element={<CustomLayoutSelection />}
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
