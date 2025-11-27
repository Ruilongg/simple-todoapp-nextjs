import { ITask } from "@/types/tasks";
import Task from "./Task";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/4">Tasks</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
