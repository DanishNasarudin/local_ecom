import { getOrderDetail } from "@/app/(serverActions)/orderDetails";
import db from "@/db/db";
import { containsSearchTerm } from "@/lib/utils";
import OrderTableContent from "./(orders-components)/OrderTableContent";
import OrderTableHead from "./(orders-components)/OrderTableHead";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const dataForType = await getOrderDetail();
export type OrderDataType = typeof dataForType;

const status = await db.query.order_status.findMany({});

export type OrderStatusType = typeof status;

const Orders = async ({ searchParams }: Props) => {
  const data = await getOrderDetail();

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
        <OrderTableContent dataDB={filteredData} status={status} />
      </div>
    </div>
  );
};

export default Orders;
