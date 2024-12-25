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

import { FaFilePdf } from "react-icons/fa6";

export const DownloadColumns = [
  {
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    header: "S.N",
    enableHiding: false,
  },
  {
    accessorKey: "file",
    header: "File",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <FaFilePdf className="text-red-500" />
          <p>{row.original.file}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <p>{row.original.date}</p>;
    },
  },
  {
    accessorkey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <p>{row.original.description}</p>;
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const downloads = row.original;

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
              <Link to={`/downloads/read/${downloads.id}`}>
                <Eye />
              </Link>
              {/* <Link to={`/downloads/update/${downloads.id}`}>
                <Edit />
              </Link> */}

              <DeleteModal path={`/api/downloads/${downloads.id}`} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
