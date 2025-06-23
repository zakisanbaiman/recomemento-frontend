"use client";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../lib/api";
import { components } from "../../types/api";

type Book = components["schemas"]["CreateBookDto"] & { id: number };

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Books Collection</h1>
      <ul className="space-y-2">
        {books.map((b) => (
          <li key={b.id} className="border p-4 rounded shadow">
            <div className="font-bold text-lg">{b.title}</div>
            <div>Author: {b.author}</div>
            <div>Genre: {b.genre}</div>
            <div>Purpose: {b.purpose}</div>
            <div className="text-gray-600 mt-2">{b.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 