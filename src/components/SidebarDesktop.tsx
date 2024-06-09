"use client";
import { SidebarItems } from "@/types/sidebar";
import Link from "next/link";
import SidebarButton from "./shared/SidebarButton";
import { Separator } from "./ui/separator";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ThemModeToggle } from "./ThemButton";
interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}
function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  return (
    <aside className="w-[300px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r ">
      <div className="h-full px-3 py-4">
        <h1 className="text-lg text-foreground font-semibold mx-3 ">Sidebar</h1>
        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {props.sidebarItems.links.map((item, index) => (
              <Link
                key={index}
                href={{
                  pathname: item.href,
                  query: {
                    ...item.query,
                  },
                }}>
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
          <div className=" absolute left-0 bottom-3 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full" />
            <div className="flex justify-between items-center w-full">
              <div className="ml-1">
                <ThemModeToggle />
              </div>
              <div className="flex gap-5">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidebarDesktop;
