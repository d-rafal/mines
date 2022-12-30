import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { AppReduxDispatch, RootState } from "../store";

export const useAppDispatch: () => AppReduxDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
