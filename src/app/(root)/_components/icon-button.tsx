import { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({
  transparent,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-1.5",
        transparent && "bg-black/20 rounded-md",
        props.disabled && "opacity-50"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
