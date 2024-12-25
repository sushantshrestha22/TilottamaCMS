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

export const AdmissionColumn = [
  {
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    header: "S.N",
    enableHiding: false,
  },
  {
    accessorKey: "fname",
    header: "First Name",
  },
  {
    accessorKey: "lname",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const admissionForm = row.original;

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
              <Link to={`/admissionForm/read/${admissionForm.id}`}>
                <Eye />
              </Link>
              {/* <Link to={`/admissionForm/update/${admissionForm.id}`}>
                <Edit />
              </Link> */}

              <DeleteModal path={`/api/admission-form/${admissionForm.id}`} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
