"use client";
import {
  CopyIcon,
  DeleteIcon,
  DetailIcon,
  EditIcon,
} from "@/app/(components)/Icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import { OrderDataType } from "../orders/page";

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
  data: OrderDataType;
};

type Selection = "all" | Set<any>;

const OrderTableContent = ({ data }: Props) => {
  // console.log(data);
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
              <button
                className="mobilehover:group-hover/idhover:bg-zinc-300 transition-all
              bg-transparent rounded-lg w-[24px] h-[24px] flex justify-center items-center
              absolute right-0 top-[50%] translate-y-[-50%]"
                onClick={() => {
                  navigator.clipboard.writeText(String(data.id));
                  toast("Copied!");
                }}
              >
                <CopyIcon
                  size={16}
                  className="fill-transparent mobilehover:group-hover/idhover:fill-zinc-600 transition-all"
                />
              </button>
            </div>
          );
        case "product_name":
          return (
            <div className="text-xs">
              {data.order_product[0].product.product_name}{" "}
              {data.order_product.length > 1
                ? `[+${data.order_product.length - 1}]`
                : ""}
            </div>
          );
        case "order_date":
          return <div className="text-xs">{data.order_date}</div>;
        case "total_price":
          return <div className="text-xs">{data.total_price}</div>;
        case "order_status":
          return <div className="text-xs">{data.order_status}</div>;
        case "actions":
          return (
            <div className=" relative flex items-center gap-2">
              <Tooltip content="Details" size="sm">
                <button
                  className=" mobilehover:hover:bg-zinc-300 transition-all
                  bg-transparent rounded-md w-[24px] h-[24px] flex justify-center items-center"
                  onClick={() => handleOpen(data.id)}
                >
                  <DetailIcon size={16} />
                </button>
              </Tooltip>
              <Tooltip content="Edit user" size="sm">
                <button
                  className=" mobilehover:hover:bg-zinc-300 transition-all
                  bg-transparent rounded-md w-[24px] h-[24px] flex justify-center items-center"
                >
                  <EditIcon size={16} />
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Delete user" size="sm">
                <button
                  className=" mobilehover:hover:bg-zinc-300 transition-all
                  bg-transparent rounded-md w-[24px] h-[24px] flex justify-center items-center
                  text-danger"
                >
                  <DeleteIcon size={16} />
                </button>
              </Tooltip>
            </div>
          );
        default:
          return <div>{cellValue ? cellValue.toString() : ""}</div>;
      }
    },
    []
  );

  return (
    <div>
      <Table
        aria-label="Order Table"
        fullWidth
        radius="sm"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Orders."} items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Test</ModalHeader>
              <ModalBody>
                {data.map((item) => {
                  if (item.id === dataId) {
                    return (
                      <>
                        <p>{item.id}</p>
                        <p>{item.customer?.customer_name}</p>
                        <p>{item.customer?.customer_email}</p>
                        <p>Products:</p>
                        {item.order_product.length > 1
                          ? item.order_product.map((order) => {
                              return (
                                <>
                                  <p>{order.product.product_name}</p>
                                </>
                              );
                            })
                          : item.order_product[0].product.product_name}
                      </>
                    );
                  } else {
                    return;
                  }
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderTableContent;
