import {
  CartIcon,
  CouponIcon,
  DashboardIcon,
  OrdersIcon,
  SettingIcon,
} from "@/app/(components)/Icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";

type Props = {};

const links = [
  {
    link: "/studio",
    name: "Dashboard",
    icon: <DashboardIcon size={18} />,
  },
  {
    link: "/studio",
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

const StudioNavbar = (props: Props) => {
  return (
    <nav
      className="
    max-w-[200px] w-full fixed left-0 bg-white h-screen border-r-[1px] border-grayLine
    flex flex-col gap-2 p-4"
    >
      {links.map((val, key) => {
        return (
          <Link href={val.link} key={key}>
            <Button
              startContent={val.icon}
              radius="sm"
              size="sm"
              fullWidth
              className="fill-grayDark text-grayDark bg-transparent mobilehover:hover:bg-accentLight mobilehover:hover:text-accent justify-start"
            >
              {val.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export default StudioNavbar;
