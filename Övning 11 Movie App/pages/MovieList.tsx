// TODO fill the MovieList page
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard.tsx";
import { API_URL } from "../Interfaces.ts";
import type { IMovie } from "../Interfaces.ts";

export default function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [arrayStateMessage, setArrayStateMessage] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Kunde inte hämta bilar");

        const data: IMovie[] = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Fel vid inläsning:", error);
        setArrayStateMessage(
          "Error reading movies, check the console for more info!",
        );
      } finally {
        setArrayStateMessage("");
      }
    }

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen  p-8 font-sans">
      <div className="grid grid-cols-1 gap-6">
        <h3 className="text-lg font-bold">Movies</h3>
        {movies.length === 0 ? (
          <p className="text-slate-500 text-center py-8 bg-slate-800/50 rounded-xl border border-slate-800">
            {arrayStateMessage}
          </p>
        ) : (
          <div className="space-y-3">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 p-8 rounded-2xl shadow-lg">
        <button
          onClick={() => navigate("/addmovie")}
          className="w-full font-semibold py-2 px-4 rounded-lg transition-colors bg-purple-600 hover:bg-purple-700 text-white"
        >
          Add a movie
        </button>
      </div>
    </div>
  );
}
