import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

interface TableCellProps extends ComponentProps<"td"> {}

export function TableCell(props: TableCellProps) {
  return (
    <td {...props} className={cn("py-3 px-2.5 text-sm text-zinc-300", props.className)} />
  )
}