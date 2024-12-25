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

export const AdvisoryColumns = [
  {
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    header: "S.N",
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "expertise",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expertise
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("expertise")}</div>
    ),
  },
  {
    accessorKey: "current_academic_position",
    header: "Current Academic Position",
  },
  {
    accessorKey: "highest_academic_degree",
    header: "Highest Academic Degree",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const advisory_committee = row.original;

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
              <Link
                to={`/advisory-committee/read/${advisory_committee.id}`}
              >
                <Eye />
              </Link>
              <Link
                to={`/advisory-committee/update/${advisory_committee.id}`}
              >
                <Edit />
              </Link>

              <DeleteModal
                path={`/api/advisory-committee/${advisory_committee.id}`}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
