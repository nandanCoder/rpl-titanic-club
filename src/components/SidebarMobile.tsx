"use client";

import { SidebarItems } from "@/types/sidebar";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { SidebarButtonSheet as SidebarButton } from "./shared/SidebarButton";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { UserButton } from "@clerk/nextjs";
import { ThemModeToggle } from "./ThemButton";
interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}
function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="top-3 left-3 fixed z-40">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-3 py-4" side="left" hideClose>
        <SheetHeader className="flex flex-row justify-between space-y-0 items-center">
          <span className="text-lg font-semibold text-foreground mx-3">
            Titanic
          </span>
          <SheetClose asChild>
            <Button className="h-7 w-7 p-0">
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            {props.sidebarItems.links.map((item, index) => (
              <Link
                href={{
                  pathname: item.href,
                  query: {
                    ...item.query,
                  },
                }}
                key={index}>
                <SidebarButton
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full"
                  icon={item.icon}>
                  {item.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className=" absolute left-0 bottom-4 w-full px-1">
            <Separator className="absolute -top-3 left-0 w-full" />
            <div className="flex justify-between items-center w-full">
              <div className="ml-2">
                <ThemModeToggle />
              </div>
              <div className="flex gap-5">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMobile;
