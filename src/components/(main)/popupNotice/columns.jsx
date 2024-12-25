import { StatusModal } from "@/components/modal/activemodal";
import { DeleteModal } from "@/components/modal/deletemodal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Edit, Eye, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const popupNoticeColumns = [
  {
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    header: "S.N",
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold `}>
          {status === "active" ? (
            <StatusModal
              path={`/api/notices/popup/${row.original.id}`}
              isActive="Active"
            />
          ) : (
            <StatusModal
              path={`/api/notices/popup/${row.original.id}`}
              isActive="Inactive"
            />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start"
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.image;

      return (
        <img
          src={image}
          alt="image"
          className="h-10 w-10 rounded-full object-cover"
        />
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const noticePopup = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <div className="flex gap-2 w-full">
              <Link to={`/noticePopup/read/${noticePopup.id}`}>
                <Eye />
              </Link>
              {/* <Link to={`/noticePopup/update/${noticePopup.id}`}>
                <Edit />
              </Link> */}

              <DeleteModal path={`/api/notices/popup/${noticePopup.id}`} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
