import db from "@/db/db";
import { containsSearchTerm } from "@/lib/utils";
import OrderTableContent from "./(orders-components)/OrderTableContent";
import OrderTableHead from "./(orders-components)/OrderTableHead";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const data = await db.query.order_detail.findMany({
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

export type OrderDataType = typeof data;

const status = await db.query.order_status.findMany({});

export type OrderStatusType = typeof status;

const Orders = async ({ searchParams }: Props) => {
  // console.log(data[1].order_item[1]);
  let filteredData: OrderDataType = [...data];

  const searchTerm = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;

  if (searchTerm) {
    filteredData = filteredData.filter((order) =>
      Object.values(order).some((value) =>
        containsSearchTerm(value, searchTerm)
      )
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <div>Orders</div>
      <div className="bg-white border-[1px] border-grayLine p-4 rounded-lg flex flex-col gap-4">
        <OrderTableHead status={status} />
        <OrderTableContent data={filteredData} status={status} />
      </div>
    </div>
  );
};

export default Orders;
