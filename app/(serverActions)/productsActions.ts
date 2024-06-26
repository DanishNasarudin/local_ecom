"use server";

import db from "@/db/db";
import { product_item_schemaInsert } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { InferQueryModel } from "./drizzleHelperFunction";

type ProductsDetailType = z.infer<typeof product_item_schemaInsert>;

// export const updateProductsDetail = async <
// K extends keyof ProductsDetailType,
// V extends ProductsDetailType[K]
// >(
// id: number,
// field: K,
// value: V,
// table: string
// ) => {
//   try {
//     await db
//       .update(product)
//       .set({ [field]: value })
//       .where(eq(order_detail.id, id));

//     revalidateTag("order_detail");
//   } catch (e) {
//     throw new Error(`${e.message}`);
//   }
// }

// export const getProductsDetail = unstable_cache(
//   async () => {
//     return db.query.product_item.findMany({
//       with: {
//         product: true,
//         product_variation: {
//           columns: {
//             product_item_id: false,
//           },
//         },
//         product_image: {
//           columns: {
//             product_item_id: false,
//           },
//         },
//       },
//     });
//   },
//   ["products_detail"],
//   { tags: ["products_detail"], revalidate: 60 }
// );

// export type ProductsDetail = InferQueryModel<
//   "product_item",
//   undefined,
//   {
//     product: true;
//     product_variation: { columns: { product_item_id: false } };
//     product_image: { columns: { product_item_id: false } };
//   }
// >[];

export const getProductAdmin = unstable_cache(
  async () => {
    return db.query.product.findMany({
      with: {
        product_item: {
          columns: {
            product_id: false,
          },
          with: {
            product_variation: {
              columns: {
                product_item_id: false,
                variation_option_id: false,
              },
              with: {
                variation_option: {
                  columns: {
                    variation_id: false,
                  },
                },
              },
            },
            product_image: {
              columns: {
                product_item_id: false,
              },
            },
          },
        },
      },
    });
  },
  ["product_admin"],
  { tags: ["product_admin"], revalidate: 60 }
);

export type ProductAdminType = InferQueryModel<
  "product",
  undefined,
  {
    product_item: {
      columns: { product_id: false };
      with: {
        product_variation: {
          columns: { product_item_id: false; variation_option_id: false };
          with: { variation_option: { columns: { variation_id: false } } };
        };
        product_image: { columns: { product_item_id: false } };
      };
    };
  }
>[];
