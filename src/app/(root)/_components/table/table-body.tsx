import { ComponentProps, Suspense } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";
import { IconButton } from "../icon-button";
import { MoreHorizontal } from "lucide-react";


export interface Attendees {
  attendees: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    checkedInAt: string | null;
  }[];
}

interface TableBodyProps extends ComponentProps<"tbody"> {
  page?: number;
  data?: Attendees
}

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function TableBody(props: TableBodyProps) {
  
  return (
    <tbody>
      {props.data && props.data.attendees.map((attendee) => {
        return (
          <TableRow
            key={attendee.id}
            className="border-b border-white/10 hover:bg-white/5"
          >
            <TableCell>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10 form-checkbox text-orange-400  focus:ring-0"
              />
            </TableCell>
            <TableCell suppressHydrationWarning>{attendee.id}</TableCell>
            <TableCell suppressHydrationWarning>
              <div suppressHydrationWarning className="flex flex-col gap-1">
                <span
                  suppressHydrationWarning
                  className="font-semibold text-white"
                >
                  {attendee.name}
                </span>
                <span suppressHydrationWarning>{attendee.email}</span>
              </div>
            </TableCell>
            <TableCell suppressHydrationWarning>
              {dayjs().to(attendee.createdAt)}
            </TableCell>
            <TableCell suppressHydrationWarning>
              {attendee.checkedInAt === null 
              ? <span className="text-zinc-400">Não fez check-in</span> 
              : dayjs().to(attendee.checkedInAt)}
            </TableCell>

            <TableCell>
              <IconButton transparent>
                <MoreHorizontal size={16} />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </tbody>
  );
}
