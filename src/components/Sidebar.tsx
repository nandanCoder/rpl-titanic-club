"use client";

import { SidebarItems } from "@/types/sidebar";
import SidebarDesktop from "./SidebarDesktop";
import {
  Home,
  MoreHorizontal,
  User,
  Info,
  Mail,
  Image,
  CircleHelp,
  Handshake,
  CreditCardIcon,
} from "lucide-react";
import SidebarButton from "./shared/SidebarButton";
import { useMediaQuery } from "usehooks-ts";
import SidebarMobile from "./SidebarMobile";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false, // fix Hydration failed in server side randaring
  });

  const { user } = useUser();

  const sidebarItems: SidebarItems = {
    links: [
      {
        label: "Home",
        href: "/",
        icon: Home,
      },
      {
        label: "How it Work",
        href: "/how-it-work",
        icon: CircleHelp,
      },
      {
        label: "Gallery",
        href: "/gallery",
        icon: Image,
      },
      {
        label: "Donate",
        href: "/donate",
        icon: Handshake,
        query: {
          name: user?.fullName,
          email: user?.emailAddresses[0].emailAddress,
        },
      },
      {
        label: "About",
        href: "/about",
        icon: Info,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: Mail,
      },
      {
        label: "Profile",
        href: "/user-profile",
        icon: User,
      },
      {
        label: "All donates",
        href: "/payments/all",
        icon: CreditCardIcon,
      },
    ],
    extras: (
      <div>
        {/* <SidebarButton className="w-full" icon={MoreHorizontal}>
          More
        </SidebarButton> */}
        {/* <Link href={"/dashboard"} className=" px-6 p-2 mt-4 w-full flexCenter ">
          <Button variant="btn_blue" className="w-full text-lg rounded-full">
            Dashboard
          </Button>
        </Link> */}
      </div>
    ),
  };

  if (isDesktop) return <SidebarDesktop sidebarItems={sidebarItems} />;
  return <SidebarMobile sidebarItems={sidebarItems} />;
}

export default Sidebar;
