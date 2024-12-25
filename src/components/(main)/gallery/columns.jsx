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

export const GalleryColumns = [
  {
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
    header: "S.N",
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.images;

      return (
        <img
          src={image}
          alt="image"
          className="h-10 w-10 rounded-full object-cover"
        />
      );
    },
  },
  //   {
  //     accessorKey: "title",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //           className="text-start"
  //         >
  //           Title
  //           <ArrowUpDown />
  //         </Button>
  //       );
  //     },
  //   },
 
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const gallery = row.original;

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
              <Link to={`/gallery/read/${gallery.id}`}>
                <Eye />
              </Link>
              <Link to={`/gallery/update/${gallery.id}`}>
                <Edit />
              </Link>

              <DeleteModal path={`/api/gallery/${gallery.id}`} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
