import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button, ButtonProps } from "../ui/button";
import { SheetClose } from "../ui/sheet";

interface SidebarButtonProps extends ButtonProps {
  // extends meen i took ore props from button
  icon?: LucideIcon;
}
function SidebarButton({
  icon: Icon,
  className,
  children,
  ...props
}: SidebarButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn("gap-2 justify-start", className)}
      {...props}>
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </Button>
  );
}

export default SidebarButton;

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
