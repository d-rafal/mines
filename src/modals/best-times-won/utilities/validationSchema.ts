import { FormDataForYup } from "../../../@types-and-const/@general";
import * as yup from "yup";
import { type FormDataType } from "../BestResultsWon";

export const validationSchema = yup
  .object<FormDataForYup<FormDataType>>({
    playerName: yup
      .string()
      .trim("The contact name cannot include leading and trailing spaces")
      .strict(false)
      .required("Required"),
  })
  .required();
