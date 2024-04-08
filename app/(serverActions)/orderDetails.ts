"use server";

import db from "@/db/db";
import { order_detail, order_detail_schemaInsert } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";

type OrderDetailTableType = z.infer<typeof order_detail_schemaInsert>;

export const updateOrderDetail = async <
  K extends keyof OrderDetailTableType,
  V extends OrderDetailTableType[K]
>(
  id: number,
  field: K,
  value: V
) => {
  try {
    await db
      .update(order_detail)
      .set({ [field]: value })
      .where(eq(order_detail.id, id));

    revalidateTag("order_detail");
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const getOrderDetail = unstable_cache(
  async () => {
    return db.query.order_detail.findMany({
      columns: {
        user_id: false,
        order_status: false,
      },
      with: {
        order_item: {
          columns: {
            product_item_id: false,
          },
          with: {
            product_item: {
              with: {
                product: true,
                product_image: true,
              },
            },
            variation_option: true,
          },
        },
        user: true,
        order_status: true,
      },
    });
  },
  ["order_detail"],
  { tags: ["order_detail"], revalidate: 60 }
);
