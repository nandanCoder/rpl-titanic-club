import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface SidebarItems {
  links: Array<{
    query?: object;
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}
