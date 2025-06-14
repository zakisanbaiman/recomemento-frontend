"use client";
import { useState } from "react";
import { recommendBook } from "../../lib/api";
import type { Book } from "../../lib/api";

export default function RecommendPage() {
  const [genre, setGenre] = useState("小説");
  const [purpose, setPurpose] = useState("entertainment");
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

  // 選択肢の例
  const genreOptions = ["小説", "ビジネス", "自己啓発", "エッセイ", "漫画"];
  const purposeOptions = [
    { value: "entertainment", label: "娯楽" },
    { value: "learning", label: "学習" },
    { value: "self-improvement", label: "自己啓発" },
    { value: "other", label: "その他" },
  ];

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">あなたにおすすめの本を紹介します</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-black">
          好きなジャンル
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
          読書の目的
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
          {loading ? "検索中..." : "おすすめ本を探す"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">エラー: {error}</div>}
      {result && (
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-2 text-black">おすすめの本</h2>
          <div className="mb-2 font-bold text-black">{result.title}</div>
          <div className="mb-1 text-sm text-black">著者: {result.author}</div>
          <div className="mb-2 text-sm text-black">
            ジャンル: {result.genre} ／ 目的: {result.purpose}
          </div>
          <div className="text-black">{result.description}</div>
        </div>
      )}
      {result === null && !loading && !error && (
        <div className="bg-white p-6 rounded shadow mt-6 text-black">
          該当する本がありませんでした。
        </div>
      )}
    </div>
  );
} 