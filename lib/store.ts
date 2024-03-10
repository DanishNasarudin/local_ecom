import db from "@/db/db";
import { create } from "zustand";

type OrderDataStore = {
  data: any;
  getData: () => Promise<void>;
};

export const useOrderData = create<OrderDataStore>((set) => ({
  data: [],
  getData: async () => {
    const data = await db.query.orders.findMany({
      with: {
        order_product: {
          with: {
            product: true,
            order: true,
          },
        },
        customer: true,
      },
    });
    set(() => ({ data: data }));
  },
}));
