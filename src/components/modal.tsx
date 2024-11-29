import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  button?: {
    label?: string;
    icon?: LucideIcon;
  };
}

export function Modal({ button, title, children }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center ml-3 justify-between">
          {button?.icon && <button.icon />}
          <span> {button?.label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] w-full ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
