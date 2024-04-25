"use client";

import { useState, useEffect, ChangeEvent, useCallback } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";

import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/taable-header";
import { TableCell } from "./table/table-cell";
import { Attendees, TableBody } from "./table/table-body";
import { fetchAttendees } from "./_actions/action";

import { usePathname, useSearchParams } from "next/navigation";

export function AttendeeList() {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [search, setSearch] = useState(() => {
    if(searchParams.has("query")) {
      return searchParams.get("query") ?? "";
    }
    return "";
  });
  const [page, setPage] = useState(() => {
    if (searchParams.has("page")) {
      return Number(searchParams.get("page"));
    }
    return 1
  });
  const [data, setData] = useState<Attendees>();
  const [totalPages, setTotalPages] = useState(0);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  
  const setCurrentPage = (page: number) => {
    const queryString = createQueryString("page", String(page));
    const url = `${pathName}?${queryString}`;
    window.history.pushState({}, "", url);
    setPage(page);
  };

  const setCurrentSearch = (search: string) => {
    const queryString = createQueryString("query", search);
    const url = `${pathName}?${queryString}`;
    window.history.pushState({}, "", url);
    setSearch(search);
  };


  useEffect(() => {
    fetchAttendees(page - 1, search)
      .then((response) => {
        setData(response);
        setTotalPages(response.attendees.length);
      })
      .catch((error: any) => console.log(error));
  }, [page, search]);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToNextPage = () => {
    setCurrentPage(page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center ">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg  flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onInputChange}
            value={search}
            type="text"
            placeholder="Buscar participantes..."
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }} />
          </tr>
        </thead>
        <TableBody data={data} />
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              {`Mostrando ${
                data?.attendees.length ?? 1
              } itens de ${totalPages} de itens`}
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de{" "}
                  {totalPages < 10
                    ? `${totalPages < 10 ? 1 : totalPages / 10}`
                    : `${totalPages / 10}`}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft size={16} />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft size={16} />
                  </IconButton>
                  <IconButton onClick={goToNextPage}>
                    <ChevronRight size={16} />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages || totalPages < 10}
                  >
                    <ChevronsRight size={16} />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
