"use client";
import { useState } from "react";
import { recommendBook } from "../../lib/api";
import type { Book } from "../../lib/api";

export default function RecommendPage() {
  const [genre, setGenre] = useState("Fiction");
  const [purpose, setPurpose] = useState("Entertainment");
  const [result, setResult] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const book = await recommendBook({ genre, purpose });
      setResult(book);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  // English options to match Go API database values
  const genreOptions = ["Fiction", "Technology", "Business"];
  const purposeOptions = [
    { value: "Entertainment", label: "Entertainment" },
    { value: "Learning", label: "Learning" },
  ];

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Find Your Perfect Book Recommendation</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-black">
          Preferred Genre
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="border rounded px-2 py-1"
            required
          >
            {genreOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-black">
          Reading Purpose
          <select
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
            className="border rounded px-2 py-1"
            required
          >
            {purposeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition font-bold" disabled={loading}>
          {loading ? "Searching..." : "Get Book Recommendation"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">Error: {error}</div>}
      {result && (
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Recommended Book</h2>
          <div className="mb-2 font-bold text-black">{result.title}</div>
          <div className="mb-1 text-sm text-black">Author: {result.author}</div>
          <div className="mb-2 text-sm text-black">
            Genre: {result.genre} ／ Purpose: {result.purpose}
          </div>
          <div className="text-black">{result.description}</div>
        </div>
      )}
      {result === null && !loading && !error && (
        <div className="bg-white p-6 rounded shadow mt-6 text-black">
          No matching books found. Please try different criteria.
        </div>
      )}
    </div>
  );
} 