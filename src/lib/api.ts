import { components } from "../types/api";

type Book = components["schemas"]["CreateBookDto"] & { id: number };

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch('http://localhost:3001/books'); // APIサーバーのURLに合わせて変更可
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
