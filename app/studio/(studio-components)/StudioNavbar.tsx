"use client";
import {
  ArrowDoubleIcon,
  CartIcon,
  CouponIcon,
  DashboardIcon,
  OrdersIcon,
  SettingIcon,
} from "@/app/(components)/Icons";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const links = [
  {
    link: "/studio",
    name: "Dashboard",
    icon: <DashboardIcon size={18} />,
  },
  {
    link: "/studio/orders",
    name: "Orders",
    icon: <OrdersIcon size={18} />,
  },
  {
    link: "/studio/products",
    name: "Products",
    icon: <CartIcon size={18} />,
  },
  {
    link: "/studio",
    name: "Coupons",
    icon: <CouponIcon size={18} />,
  },
  {
    link: "/studio",
    name: "Settings",
    icon: <SettingIcon size={18} />,
  },
];

const StudioNavbar = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <nav
      className={`
      group
    ${
      !sidebar ? "max-w-[200px]" : "max-w-[64px]"
    } w-full relative left-0 bg-white h-screen border-r-[1px] border-grayLine
    flex flex-col gap-2 p-4
    transition-all`}
    >
      {links.map((val, key) => {
        return (
          <Tooltip
            key={key}
            isDisabled={!sidebar}
            closeDelay={0}
            content={val.name}
            placement="right"
            size="sm"
            radius="sm"
          >
            <Button
              as={Link}
              href={val.link}
              startContent={val.icon}
              radius="sm"
              size="sm"
              fullWidth={!sidebar}
              isIconOnly={sidebar}
              className={`
                fill-grayDark text-grayDark bg-transparent mobilehover:hover:bg-accentLight mobilehover:hover:text-accent
                ${!sidebar ? "justify-start" : ""}`}
            >
              {!sidebar ? val.name : ""}
            </Button>
          </Tooltip>
        );
      })}
      <Button
        isIconOnly
        className="
        group/sideButton
        opacity-0 mobilehover:group-hover:opacity-100
        absolute top-0 right-0 translate-x-[100%]
        rounded-r-md border-[1px] border-grayLine
        bg-white mobilehover:hover:bg-zinc-100"
        radius="none"
        size="sm"
        startContent={
          <ArrowDoubleIcon
            className={`${sidebar ? "rotate-90" : "-rotate-90"} fill-grayDark`}
            size={18}
          />
        }
        onClick={() => {
          setSidebar((prev: boolean) => (prev = !sidebar));
        }}
      />
    </nav>
  );
};

export default StudioNavbar;
