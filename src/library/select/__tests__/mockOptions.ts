import { Option } from "../Select";

export type AllowedValues =
  | "Cherry"
  | "Lemon"
  | "Banana"
  | "Strawberry"
  | "Apple";

export const mockOptions: Option<AllowedValues>[] = [
  { value: "Cherry", text: "Cherry" },
  { value: "Lemon", text: "Lemon" },
  { value: "Banana", text: "Banana" },
  { value: "Strawberry", text: "Strawberry" },
  { value: "Apple", text: "Apple" },
];
