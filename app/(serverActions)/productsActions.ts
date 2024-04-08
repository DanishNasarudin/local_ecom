import db from "@/db/db";
import { product_item_schemaInsert } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { z } from "zod";

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

export const getProductsDetail = unstable_cache(
  async () => {
    return db.query.product_item.findMany({
      with: {
        product: true,
        product_variation: {
          columns: {
            product_item_id: false,
          },
        },
        product_image: {
          columns: {
            product_item_id: false,
          },
        },
      },
    });
  },
  ["products_detail"],
  { tags: ["products_detail"], revalidate: 60 }
);

const productDetailType = await getProductsDetail();

export type ProductsDetail = typeof productDetailType;
