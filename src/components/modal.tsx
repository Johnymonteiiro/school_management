
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  button?: React.ReactNode;
  w?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Modal({ button, title, children, w,isOpen,onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{button && button}</DialogTrigger>
      <DialogContent className={w ? `${w} w-full` : `max-w-[900px] w-full`}>
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
