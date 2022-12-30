import { FormDataForYup } from "../../../@types-and-const/@general";
import { type FormDataType } from "../CustomLayoutSelection";
import * as yup from "yup";

export const MIN_COLS_SIZE = 6;
export const MAX_COLS_SIZE = 100;
export const MIN_ROWS_SIZE = 6;
export const MAX_ROWS_SIZE = 100;
export const MIN_MINES_PERCENT = 1;
export const MAX_MINES_PERCENT = 99;

const getTextForMinError = ({ min }: { min: number }) => `>= ${min}`;
const getTextForMaxError = ({ max }: { max: number }) => `>= ${max}`;

export const validationSchema = yup
  .object<FormDataForYup<FormDataType>>({
    colsSize: yup
      .number()
      .typeError("not a number")
      .integer("not an integer")
      .min(MIN_COLS_SIZE, getTextForMinError)
      .max(MAX_COLS_SIZE, getTextForMaxError)
      .required("Required"),
    rowsSize: yup
      .number()
      .typeError("not a number")
      .integer("not an integer")
      .min(MIN_ROWS_SIZE, getTextForMinError)
      .max(MAX_ROWS_SIZE, getTextForMaxError)
      .required("Required"),
    minesPercent: yup
      .number()
      .typeError("not a number")
      .integer("not an integer")
      .min(MIN_MINES_PERCENT, getTextForMinError)
      .max(MAX_MINES_PERCENT, getTextForMaxError)
      .required("Required"),
  })
  .required();
