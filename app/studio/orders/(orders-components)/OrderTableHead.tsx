"use client";
import { FilterIcon, SearchIcon, SortIcon } from "@/app/(components)/Icons";
import { useOrderData } from "@/lib/store";
import { createURL, debounceFunc } from "@/lib/utils";
import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

type Props = {};

const OrderTableHead = (props: Props) => {
  const filterDropdown = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "price",
      label: "Price",
    },
  ];
  const sortDropdown = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "price",
      label: "Price",
    },
  ];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setSearchParams = new URLSearchParams(searchParams.toString());

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSetSearchParams = useCallback(
    debounceFunc((searchValue) => {
      if (searchValue) {
        setSearchParams.set("search", searchValue);
      } else {
        setSearchParams.delete("search");
      }
      const setURL = createURL(pathname, setSearchParams);
      router.replace(setURL);
      setSearchTerm("");
    }, 500),
    []
  );
  const data = useOrderData((state) => state.data);

  // console.log(data);

  return (
    <div className="flex gap-2 w-max">
      <Input
        variant="bordered"
        placeholder="Search.."
        size="sm"
        radius="sm"
        startContent={<SearchIcon className="fill-grayDark" size={16} />}
        endContent={
          <CircularProgress
            aria-label="Loading..."
            classNames={{
              svg: "w-4 h-4",
            }}
            data-issearch={Boolean(searchTerm)}
            className="data-[issearch=true]:block data-[issearch=false]:hidden"
          />
        }
        className={`[&>div]:[&>div]:!min-h-[16px] [&>div]:[&>div]:h-[32px] [&>input]:[&>div]:[&>div]:[&>div]:text-[12px] [&>div]:[&>div]:max-w-[150px] [&>div]:[&>div]:border-[1px]`}
        onValueChange={(e) => {
          setSearchTerm(e);
          debouncedSetSearchParams(e);
        }}
      />
      <div className="flex gap-2">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Button
              variant="light"
              radius="sm"
              size="sm"
              startContent={<FilterIcon className="fill-grayDark" size={16} />}
            >
              Filter
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={filterDropdown}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "delete" ? "danger" : "default"}
                className={item.key === "delete" ? "text-danger" : ""}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Button
              variant="light"
              radius="sm"
              size="sm"
              startContent={<SortIcon className="fill-grayDark" size={16} />}
            >
              Sort
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={sortDropdown}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "delete" ? "danger" : "default"}
                className={item.key === "delete" ? "text-danger" : ""}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default OrderTableHead;
