import { ITask } from "./types/tasks";
const baseUrl = 'http://localhost:3001';

export const getAllTodos = async () => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  return res.json();
};

export const addTodo = async (todo: ITask) => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const editTodo = async (todo: ITask) => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const deleteTodo = async (id: string) => {
  await fetch(`${baseUrl}/tasks/${id}`, { method: 'DELETE' });
};
