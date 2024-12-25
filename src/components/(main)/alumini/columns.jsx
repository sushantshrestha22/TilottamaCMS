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

export const AluminiColumns = [
  {
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    header: "S.N",
    enableHiding: false,
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const alumini = row.original;

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
              <Link to={`/alumini/read/${alumini.id}`}>
                <Eye />
              </Link>
              <Link to={`/alumini/update/${alumini.id}`}>
                <Edit />
              </Link>

              <DeleteModal path={`/api/alumini/${alumini.id}`} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
