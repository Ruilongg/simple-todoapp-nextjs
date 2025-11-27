"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

// shadcn/ui components
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDeleted, setOpenModalDeleted] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <TableRow key={task.id}>
      {/* Task Text */}
      <TableCell className="w-full">{task.text}</TableCell>

      {/* Action Buttons */}
      <TableCell className="flex justify-end gap-4">
        {/* Edit Icon */}
        <Button
          variant="ghost"
          onClick={() => setOpenModalEdit(true)}
          className="p-0 text-blue-500 hover:bg-blue-50"
        >
          <FiEdit size={22} />
        </Button>

        {/* Edit Modal */}
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            <Input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              placeholder="Edit task..."
            />

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Modal>

        {/* Delete Icon */}
        <Button
          variant="ghost"
          onClick={() => setOpenModalDeleted(true)}
          className="p-0 text-red-500 hover:bg-red-50"
        >
          <FiTrash2 size={22} />
        </Button>

        {/* Delete Modal */}
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>

          <p className="py-2 text-sm">
            Are you sure you want to delete this task?
          </p>

          <DialogFooter>
            <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
              Yes, delete
            </Button>
          </DialogFooter>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default Task;
