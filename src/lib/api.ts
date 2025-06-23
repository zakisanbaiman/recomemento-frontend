import { components } from "../types/api";

export type Book = components["schemas"]["CreateBookDto"] & { id: number };

type RecommendRequest = {
  genre: string;
  purpose: string;
};

// Custom error class for API responses
export class ApiError extends Error {
  constructor(message: string, public status: number, public originalError?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchBooks(): Promise<Book[]> {
  try {
    const res = await fetch('http://localhost:3001/books');
    if (!res.ok) {
      if (res.status === 404) {
        throw new ApiError('No books found', 404);
      }
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || 'Failed to fetch books';
      throw new ApiError(message, res.status, errorData?.error);
    }
    return res.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    // Network error or other issues
    throw new ApiError('Unable to connect to the server. Please check if the API is running.', 0);
  }
}

export async function recommendBook(req: RecommendRequest): Promise<Book | null> {
  try {
    const res = await fetch('http://localhost:3001/books/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        const errorData = await res.json().catch(() => null);
        const message = errorData?.message || `No books found for genre "${req.genre}" and purpose "${req.purpose}"`;
        throw new ApiError(message, 404);
      }
      
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || 'Failed to get recommendation';
      throw new ApiError(message, res.status, errorData?.error);
    }
    
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    // Network error or other issues
    throw new ApiError('Unable to connect to the server. Please check if the API is running.', 0);
  }
}
