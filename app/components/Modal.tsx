"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
