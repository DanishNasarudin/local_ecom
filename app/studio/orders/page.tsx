import db from "@/db/db";
import { containsSearchTerm } from "@/lib/utils";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const data = await db.query.order_detail.findMany({
  with: {
    order_item: {
      with: {
        product_item: {
          with: {
            product_image: true,
          },
        },
      },
    },
  },
});

export type OrderDataType = typeof data;

const Orders = async ({ searchParams }: Props) => {
  console.log(data[1].order_item[1].product_item);
  let filteredData = [...data];

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
        {/* <OrderTableHead />
        <OrderTableContent data={filteredData} /> */}
      </div>
    </div>
  );
};

export default Orders;
