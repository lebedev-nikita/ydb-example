import type { Ydb } from "ydb-sdk";
import { z } from "zod";

type PropType = "string" | "string | null" | "uint32" | "uint32 | null";

type Parse = <const TProps extends [string, PropType][]>(
  rs: Ydb.IResultSet,
  properties: TProps,
) => {
  [TPair in TProps[number] as TPair[0]]: TPair[1] extends "string" ? string
  : TPair[1] extends "string | null" ? string | null
  : TPair[1] extends "uint32" ? number
  : TPair[1] extends "uint32 | null" ? number | null
  : never;
}[];

export const parse: Parse = (rs, properties) => {
  const items = rs.rows!.map((row) => {
    const item: any = {};

    properties.forEach(([key, propType], index) => {
      switch (propType) {
        case "uint32":
          item[key] = z.number().parse(row.items?.at(index)?.uint32Value);
          break;
        case "uint32 | null":
          item[key] = z.number().nullable().parse(row.items?.at(index)?.uint32Value);
          break;
        case "string":
          item[key] = z.string().parse(row.items?.at(index)?.textValue);
          break;
        case "string | null":
          item[key] = z.string().nullable().parse(row.items?.at(index)?.textValue);
          break;
      }
    });

    return item;
  });
  return items;
};
