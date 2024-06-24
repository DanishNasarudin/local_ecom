"use client";
import {
  CopyIcon,
  DeleteIcon,
  DetailIcon,
  EditIcon,
} from "@/app/(components)/Icons";
import { useOrderData } from "@/lib/store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";
// import { OrderDataType } from "../page";
import { OrderDataType } from "@/app/(serverActions)/orderDetails";
import OrderDetailModal from "./OrderDetailModal";

const columns = [
  {
    key: "id",
    label: "Order ID",
  },
  {
    key: "order_date",
    label: "Date",
  },
  {
    key: "product_name",
    label: "Product Name",
  },

  {
    key: "total_price",
    label: "Total (RM)",
  },
  {
    key: "order_status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

type Props = {
  dataDB: OrderDataType;
  status: {
    id: number;
    status: string | null;
  }[];
};

type Selection = "all" | Set<any>;

const OrderTableContent = ({ dataDB, status }: Props) => {
  const { data, setData } = useOrderData();
  // console.log(data);

  React.useEffect(() => {
    if (dataDB) {
      // console.log("Pass");
      setData(dataDB);
    }
  }, [dataDB]);

  const [mount, setMount] = useState(false);

  React.useEffect(() => {
    if (!mount) {
      setMount(true);
    }
  }, [mount]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataId, setDataId] = useState("");

  const handleOpen = (dataId: string) => {
    setDataId(dataId);
    onOpen();
  };

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  // console.log(selectedKeys);

  const renderCell = React.useCallback(
    (data: OrderDataType[0], columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof OrderDataType[0]];

      switch (columnKey) {
        case "id":
          return (
            <div className="relative group/idhover text-xs">
              <div className="whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[100px]">
                {data.id}
              </div>
              <Button
                className="mobilehover:group-hover/idhover:bg-zinc-300 transition-all
              bg-transparent rounded-lg min-w-[24px] w-[24px] h-[24px] flex justify-center items-center
              absolute right-0 top-[50%] translate-y-[-50%]"
                onClick={() => {
                  navigator.clipboard.writeText(String(data.id));
                  toast("Copied!");
                }}
                isIconOnly
                startContent={
                  <CopyIcon
                    size={16}
                    className="fill-transparent mobilehover:group-hover/idhover:fill-zinc-600 transition-all"
                  />
                }
              />
            </div>
          );
        case "product_name":
          return (
            <div className="text-xs">
              {data.order_item[0].product_item?.product?.product_name}{" "}
            </div>
          );
        case "order_date":
          return <div className="text-xs">{data.order_date}</div>;
        case "total_price":
          return <div className="text-xs">{data.order_total}</div>;
        case "order_status":
          return <div className="text-xs">{data.order_status?.status}</div>;
        case "actions":
          return (
            <div className=" relative flex items-center gap-2">
              <Tooltip content="Details" size="sm">
                <Button
                  className=" mobilehover:hover:bg-zinc-300 transition-all
                  bg-transparent rounded-md min-w-[24px] w-[24px] h-[24px] flex justify-center items-center"
                  onClick={() => handleOpen(String(data.id))}
                  isIconOnly
                  startContent={<DetailIcon size={16} />}
                />
              </Tooltip>
              <Tooltip content="Edit user" size="sm">
                <Button
                  className=" mobilehover:hover:bg-zinc-300 transition-all
                  bg-transparent rounded-md min-w-[24px] w-[24px] h-[24px] flex justify-center items-center"
                  onClick={() => handleOpen(String(data.id))}
                  isIconOnly
                  startContent={<EditIcon size={16} />}
                />
              </Tooltip>
              <Tooltip color="danger" content="Delete user" size="sm">
                <Button
                  className=" mobilehover:hover:bg-zinc-300 transition-all
                  bg-transparent rounded-md min-w-[24px] w-[24px] h-[24px] flex justify-center items-center
                  text-danger"
                  onClick={() => handleOpen(String(data.id))}
                  isIconOnly
                  startContent={<DeleteIcon size={16} />}
                />
              </Tooltip>
            </div>
          );
        default:
          return <div>{cellValue ? cellValue.toString() : ""}</div>;
      }
    },
    []
  );

  if (!mount)
    return (
      <div className="flex w-full justify-center items-center">Loading</div>
    );

  return (
    <div>
      <Table
        aria-label="Order Table"
        fullWidth
        radius="sm"
        selectionMode="multiple"
        disabledBehavior="selection"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} aria-label={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Orders."} items={data}>
          {(item) => (
            <TableRow key={`${item.id}`} aria-label={String(item.id)}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <OrderDetailModal
        modalDefaults={{
          isOpen: isOpen,
          onClose: onClose,
        }}
        dataId={dataId}
        status={status}
      />
    </div>
  );
};

export default OrderTableContent;
