"use client";
import { useEffect, useState } from "react";
import { fetchBooks, ApiError } from "../../lib/api";
import { components } from "../../types/api";

type Book = components["schemas"]["CreateBookDto"] & { id: number };

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'not-found' | 'server-error' | 'other'>('other');

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((e) => {
        if (e instanceof ApiError) {
          setError(e.message);
          if (e.status === 404) {
            setErrorType('not-found');
          } else if (e.status === 0) {
            setErrorType('server-error');
          } else {
            setErrorType('other');
          }
        } else {
          setError(e.message);
          setErrorType('other');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const renderError = () => {
    if (!error) return null;

    switch (errorType) {
      case 'not-found':
        return (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
            <div className="flex items-center">
              <span className="text-2xl mr-2">📚</span>
              <div>
                <p className="font-semibold">No books found</p>
                <p className="text-sm">The book collection is currently empty.</p>
              </div>
            </div>
          </div>
        );
      case 'server-error':
        return (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🔌</span>
              <div>
                <p className="font-semibold">Connection Error</p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-1">Please make sure the API server is running on port 3001.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            <div className="flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">{renderError()}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Books Collection</h1>
      {books.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
          <div className="flex items-center">
            <span className="text-2xl mr-2">📖</span>
            <div>
              <p className="font-semibold">No books in collection</p>
              <p className="text-sm">The book collection is currently empty. Add some books to get started!</p>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
} 