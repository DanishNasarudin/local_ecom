"use client";
import { Button } from "@nextui-org/button";
import { useClassHTML } from "../(hooks)/useClassHTML";
import unmLogo from "../../public/unm_logo.png";
import { CartIcon, SearchIcon, UserIcon } from "./Icons";

type Props = {};

const Navbar = (props: Props) => {
  useClassHTML();
  return (
    <nav className="flex justify-between px-4 py-4 border-b-[1px] border-grayLine bg-white">
      <img src={unmLogo.src} alt="logo" />
      <div className="flex gap-2 items-center">
        <Button
          isIconOnly
          startContent={<SearchIcon className="fill-grayDark" />}
          variant="light"
        />
        <Button
          isIconOnly
          startContent={<CartIcon className="fill-grayDark" />}
          variant="light"
        />
        <Button
          isIconOnly
          startContent={<UserIcon className="fill-grayDark" />}
          variant="bordered"
          className="border-[1px]"
        />
      </div>
    </nav>
  );
};

export default Navbar;
