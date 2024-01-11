"use client";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc/trpc-client";
import { DBMESSAGE } from "@/types/main";
import { PulseLoader } from "react-spinners";
import { useVirtualizer } from "@tanstack/react-virtual";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<DBMESSAGE, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => router.push(`messages/${row.original.id}`)}
              className=" hover:cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default function MailsTable() {
  // Fields of table
  const columns = useMemo<ColumnDef<DBMESSAGE>[]>(
    () => [
      { accessorKey: "id", header: "ID", accessorFn: (row) => row.id },
      { accessorKey: "sendersName" },
      { accessorKey: "title" },
      {
        accessorKey: "content",
        accessorFn: (row) =>
          `${row.content.slice(0, 50)}${row.content.length > 50 && "..."}`,
      },
      {
        accessorKey: "date",
        accessorFn: (row) =>
          new Date(row.date).toLocaleDateString("en-US", dateFormatOptions),
      },
    ],
    []
  );
  // Infinite query
  const { fetchNextPage, data, isLoading, isFetching } =
    trpc.getMessagesProcedure.useInfiniteQuery(
      {
        limit: 25,
      },
      {
        getNextPageParam: (lastPage) => lastPage.cursor,
        initialCursor: 0,
        refetchOnWindowFocus: false,
      }
    );
  // Prepare data from infinite query
  const mails = useMemo(
    () => data?.pages?.flatMap(({ data }) => data) ?? [],
    [data]
  );

  // Get additional data from infinite query
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = mails.length;
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Fetch more data when user scrolls to bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 250 &&
          !isFetching &&
          totalFetched < totalDBRowCount &&
          scrollTop > 0
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  if (mails.length !== 0) {
    return (
      <div className="w-full h-full">
        <div
          ref={tableContainerRef}
          className="rounded-md border w-full max-h-[840px] overflow-hidden overflow-y-scroll"
          onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        >
          <DataTable columns={columns} data={mails} />
        </div>
        <div className=" flex justify-between box-border p-2">
          <span>
            Loaded {totalFetched} of {totalDBRowCount}
          </span>
          {isFetching && (
            <span className=" w-20 h-auto flex justify-center">
              <PulseLoader color="#f8fafc" loading={true} className="pr-5" />
            </span>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className=" w-full flex justify-center">
        <PulseLoader color="#f8fafc" loading={true} className="pr-5" />
      </div>
    );
  }
}
