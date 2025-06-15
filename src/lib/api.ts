import { components } from "../types/api";

export type Book = components["schemas"]["CreateBookDto"] & { id: number };

type RecommendRequest = {
  genre: string;
  type: string;
  purpose: string;
};

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch('http://localhost:3001/books'); // APIサーバーのURLに合わせて変更可
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function recommendBook(req: RecommendRequest): Promise<Book | null> {
  const res = await fetch('http://localhost:3001/books/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
