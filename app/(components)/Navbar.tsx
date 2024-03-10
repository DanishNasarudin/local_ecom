"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
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
        <div className="ml-2">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-all ring-1"
                radius="sm"
                showFallback
                fallback={<UserIcon className="fill-grayDark" />}
                classNames={{
                  base: "bg-transparent mobilehover:hover:bg-zinc-200 transition-all",
                }}
                src="https://images.unsplash.com/broken"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
