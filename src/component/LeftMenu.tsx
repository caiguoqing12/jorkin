"use client";

import React from "react";
import { HomeIcon, EssayIcon } from "@/component/icons";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";

type MenuItemType = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  path: string;
};

const menus: MenuItemType[] = [
  {
    label: "算法",
    Icon: HomeIcon,
    path: "/",
  },
  {
    label: "八股文",
    Icon: EssayIcon,
    path: "/essay",
  },
];

export default function LeftMenu() {
  const pathname = usePathname();

  return (
    <div className="w-[180px] bg-white rounded-2xl px-4 py-6 gap-4 flex flex-col">
      {menus?.map((item: MenuItemType) => (
        <Link
          href={item.path}
          className={`flex gap-2 items-center text-[#525252] text-[14px] cursor-pointer h-[38px] rounded-md  px-4 ${
            pathname === item.path ? "bg-[#FFF6ED] text-[#FB6011]" : "bg-white"
          }`}
          key={item.label}
        >
          {
            <item.Icon
              className={`w-[18px] h-[18px] ${
                pathname === item.path ? "text-[#FB6011]" : ""
              }`}
            />
          }
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
