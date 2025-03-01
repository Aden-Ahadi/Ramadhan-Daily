import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  isLocalFile?: boolean;
}

export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  isLocalFile,
}: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="aspect-video w-full">
          {isLocalFile ? (
            <video controls className="w-full h-full rounded-md" src={videoUrl}>
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title="Quran Recitation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
