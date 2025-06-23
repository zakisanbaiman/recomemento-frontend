import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            📚 Recomemento
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover your next favorite book with our intelligent recommendation system.
            Find books tailored to your preferences and reading goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/recommend"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Get Book Recommendations
            </Link>
            <Link 
              href="/books"
              className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition-colors"
            >
              Browse All Books
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Personalized</h3>
              <p className="text-gray-600">Get recommendations based on your preferred genre and reading purpose.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Powered by high-performance Go backend for lightning-fast responses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📖</div>
              <h3 className="text-lg font-semibold mb-2">Curated Collection</h3>
              <p className="text-gray-600">Carefully selected books across multiple genres and purposes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
