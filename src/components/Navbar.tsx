"use client"; // for use react hookes this component clint side randaring
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
        className
      )}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"></MenuItem>
        </Link>

        <MenuItem setActive={setActive} active={active} item="Our Corses">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/corses">All Courses</HoveredLink>
            <HoveredLink href="/corses">Basic Music Theory</HoveredLink>
            <HoveredLink href="/corses">Advanced Composition</HoveredLink>
            <HoveredLink href="/corses">Songwriting</HoveredLink>
            <HoveredLink href="/corses">Music Production</HoveredLink>
          </div>
        </MenuItem>
        <Link href={"/contact"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact Us"></MenuItem>
        </Link>
        <div className=" ml-5 gap-3">
          <UserButton />
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
