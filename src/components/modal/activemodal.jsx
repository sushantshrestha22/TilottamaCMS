import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { editData } from "@/query/query";

export function StatusModal({ path, isActive }) {
  const handelActive = async () => {
    try {
      await editData(path);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{isActive}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive === "Active"
              ? "Are you sure you want to deactivate?"
              : "Are you sure you want to activate?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive === "Active"
              ? "This action will deactivate the item. You can reactivate it later if needed."
              : "This action will activate the item. You can deactivate it later if needed."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handelActive}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
