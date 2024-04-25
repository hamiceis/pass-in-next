import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<"tr"> {}

export function TableRow(props: TableRowProps) {
  return (
    <tr {...props} className={cn("size-4 bg-black/20 rounded border border-white/10", props.className)} />
  )
}