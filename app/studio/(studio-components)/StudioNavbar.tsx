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
    link: "/studio",
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
  const [closeSidebar, setCloseSidebar] = useState(false);
  return (
    <nav
      className={`
      group
    ${
      !closeSidebar ? "max-w-[200px]" : "max-w-min"
    } w-full relative left-0 bg-white h-screen border-r-[1px] border-grayLine
    flex flex-col gap-2 p-4
    transition-all`}
    >
      {links.map((val, key) => {
        return (
          <Link href={val.link} key={key}>
            <Tooltip
              isDisabled={!closeSidebar}
              closeDelay={0}
              content={val.name}
              placement="right"
              size="sm"
              radius="sm"
            >
              <Button
                startContent={val.icon}
                radius="sm"
                size="sm"
                fullWidth={!closeSidebar}
                isIconOnly={closeSidebar}
                className={`
                fill-grayDark text-grayDark bg-transparent mobilehover:hover:bg-accentLight mobilehover:hover:text-accent
                ${!closeSidebar ? "justify-start" : ""}`}
              >
                {!closeSidebar ? val.name : ""}
              </Button>
            </Tooltip>
          </Link>
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
            className={`${
              closeSidebar ? "rotate-90" : "-rotate-90"
            } fill-grayDark`}
            size={18}
          />
        }
        onClick={() => {
          setCloseSidebar((prev) => (prev = !closeSidebar));
        }}
      />
    </nav>
  );
};

export default StudioNavbar;
