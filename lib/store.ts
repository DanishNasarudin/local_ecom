import { OrderDataType } from "@/app/studio/orders/page";
import { create } from "zustand";

type OrderDataStore = {
  data: OrderDataType;
  setData: (data: OrderDataType) => void;
};

export const useOrderData = create<OrderDataStore>((set) => ({
  data: [],
  setData: async (data) => {
    set(() => {
      return { data: data };
    });
  },
}));
