"use server";

import db from "@/db/db";
import { product_category, product_item } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import { InferQueryModel } from "./drizzleHelperFunction";

// export type ProductsDetail = InferQueryModel<
//   "product_item",
//   undefined,
//   {
//     product: true;
//     product_variation: { columns: { product_item_id: false } };
//     product_image: { columns: { product_item_id: false } };
//   }
// >[];
// export const updateProductsDetail = async <
//   K extends keyof ProductsDetailType,
//   V extends ProductsDetailType[K]
// >(
//   id: number,
//   field: K,
//   value: V,
//   table: string
// ) => {
//   try {
//     await db
//       .update(product)
//       .set({ [field]: value })
//       .where(eq(product.id, id));

//     revalidateTag("product_admin");
//   } catch (e) {
//     throw new Error(`${e}`);
//   }
// };

export const updateProductActive = async ({
  id,
  value,
}: {
  id: number;
  value: boolean;
}) => {
  try {
    await db
      .update(product_item)
      .set({ is_available: value })
      .where(eq(product_item.id, id));

    revalidateTag("product_admin");
  } catch (e) {
    throw new Error(`${e}`);
  }
};

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
        product_category: {
          columns: {
            id: false,
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
    product_category: {
      columns: { id: false };
    };
  }
>[];

export const insertProductCategoryList = async ({
  value,
}: {
  value: string;
}) => {
  try {
    await db.insert(product_category).values({ category_name: value });

    revalidateTag("product_admin_category");
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const deleteProductCategoryList = async (id: number) => {
  try {
    await db.delete(product_category).where(eq(product_category.id, id));

    revalidateTag("product_admin_category");
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const getProductCategoryList = unstable_cache(
  async () => {
    return db.query.product_category.findMany({});
  },
  ["product_admin_category"],
  { tags: ["product_admin_category"], revalidate: 60 }
);

export type ProductAdminCategoryListType = InferQueryModel<
  "product_category",
  undefined,
  {}
>[];
