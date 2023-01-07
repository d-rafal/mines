import { Path, useSearchParams } from "react-router-dom";
import { ObjectShape } from "yup/lib/object";

export interface WithTestId {
  readonly testId?: string;
}

export interface WithCustomizeClassName {
  readonly customizedClassName?: string;
}

export type PropAsTypes<Type> = {
  [Property in keyof Type]-?: Property;
};

export type UnionAsProps<Union extends string> = {
  [Property in Union]: string;
};

export type UnionAsPropsAndTypes<Union extends string> = {
  [Property in Union]: Union;
};

export type MapKeys<TypeToMap, NewType> = {
  [Property in keyof TypeToMap]: NewType;
};

export type MakeAllOptional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};

export type DeepMakeAllOptional<Type> = {
  [Property in keyof Type]+?: DeepMakeAllOptional<Type[Property]>;
};

export type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

export type RetrieveArrayElementType<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type SetSearchParams = ReturnType<typeof useSearchParams>[1];

export type Optional<Type> = Type | null;

export type OrUndefined<Type> = Type | undefined;
export type OrNullUndefined<Type> = Type | null | undefined;

export type OneOrMany<Type> = Type | Type[];

export type OneOrManyOrNull<Type> = Optional<OneOrMany<Type>>;

export type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

export interface LocationStateWithFromProperty {
  from: Path;
}

export const isLocationStateWithFromPropertyPath = (
  value: any
): value is LocationStateWithFromProperty => {
  return (
    value?.from &&
    typeof value.from.pathname === "string" &&
    typeof value.from.search === "string" &&
    typeof value.from.hash === "string"
  );
};

export type FormDataForYup<T> = {
  [Property in keyof T]: ObjectShape[string];
};
