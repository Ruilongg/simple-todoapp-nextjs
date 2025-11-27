"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      {/* Replace DaisyUI button with ShadCN Button */}
      <Button
        onClick={() => setModalOpen(true)}
        className="w-full flex items-center justify-center gap-2"
      >
        Add new task <AiOutlinePlus size={18} />
      </Button>

      {/* Modal (ShadCN Dialog) */}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
          </DialogHeader>

          <Input
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
            placeholder="Type here..."
          />

          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
