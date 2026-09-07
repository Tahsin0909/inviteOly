"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
import { DataTable } from "@/components/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { generateFilterOptions, multiSelectFilterFn } from "@/utils/table";
import { type ColumnDef } from "@tanstack/react-table";
import { Ban, EyeIcon, MoreHorizontal, Pencil, Unlock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetUsersQuery, useUpdateUserMutation } from "../user.api";
import { IRole, IUser } from "../user.interface";

export const UserTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const [updateUserFn, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const { data } = useGetUsersQuery({
    page,
    limit,
    searchTerm: debouncedSearch,
  });
  const users = data?.data?.data || [];
  // const [deleteUserFn] = useDeleteUserMutation();

  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 1;

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  const handleToggleActive = async (user: IUser) => {
    const newStatus = !user.isActive;

    await handleMutationRequest(
      updateUserFn,
      { id: user.id, isActive: newStatus },
      {
        loadingMessage: newStatus ? "Unblocking user..." : "Blocking user...",
        successMessage: () =>
          newStatus
            ? "User unblocked successfully!"
            : "User blocked successfully!",
      }
    );
  };

  const roleOptions = generateFilterOptions(
    Object.values(IRole),
    (role) => role,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  // const handleDelete = async (user: IUser) => {
  //   await handleMutationRequest(deleteUserFn, user?.id, {
  //     loadingMessage: "Deleting User",
  //     successMessage: (res: ApiResponse<string>) => res?.message,
  //   });
  // };

  const columns: ColumnDef<IUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 30,
    },
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: "name",
      header: "Name",
      cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <CopyableCell value={row.original.email || "-"}>
          {row.original.email || "-"}
        </CopyableCell>
      ),
    },
    {
      accessorKey: "companyName",
      header: "Company",
    },
    {
      accessorKey: "jobTitle",
      header: "Job Title",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-slate-200">
          {row.original.role}
        </Badge>
      ),
      meta: {
        filterLabel: "Role",
        filterOptions: roleOptions,
        filterFn: multiSelectFilterFn,
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "destructive"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
      meta: {
        filterLabel: "Status",
        filterOptions: [
          { label: "Active", value: true },
          { label: "Inactive", value: false },
        ],
      },
      filterFn: multiSelectFilterFn,
    },
    {
      accessorKey: "subscription",
      header: "Subscription",
      cell: ({ row }) => (
        <Badge
          variant={row.original.hasActiveSubscription ? "default" : "secondary"}
        >
          {row.original.hasActiveSubscription ? "Active" : "None"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`users/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`users/${row?.original?.id}/edit`}>
                <Pencil className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdatingUser}
            >
              {row.original.isActive ? (
                <>
                  <Ban className="text-inherit" /> Block
                </>
              ) : (
                <>
                  <Unlock className="text-inherit" /> Unblock
                </>
              )}
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              <Trash className="text-inherit" />
              Delete
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDeleteMany = (rows: IUser[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  return (
    <DataTable
      data={users}
      columns={columns}
      total={total}
      page={page}
      limit={limit}
      searchMode="server"
      onSearch={handleSearch}
      searchQuery={searchInput}
      totalPages={totalPages}
      onPageChange={setPage}
      onDeleteSelected={handleDeleteMany}
      onPageSizeChange={(newLimit) => {
        setLimit(newLimit);
        setPage(1);
      }}
    />
  );
};
