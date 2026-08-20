import { useNavigate } from "react-router-dom";
import type { IMovie } from "../Interfaces.ts";

interface MovieCardProps {
  movie: IMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <div
      key={movie.id}
      //className="grid grid-cols-2 gap-3 justify-evenly"
      className="grid grid-cols-3 gap-3 rounded-xl border justify-between items-center shadow-md"
    >
      <div className="grid grid-cols-2 justify-start gap-3">
        <h3 className="text-lg font-bold">Year:</h3>
        <h3 className="text-lg font-bold">{movie.year}</h3>
        <h3 className="text-lg font-bold">Title:</h3>
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <h3 className="text-lg font-bold">Duration:</h3>
        <h3 className="text-lg font-bold">{movie.duration}</h3>
        <h3 className="text-lg font-bold">Description:</h3>
        <h3 className="text-lg font-bold">{movie.description}</h3>
        {/* {movie.details && (
          <h3 className="text-lg font-bold text-white">
            {movie.details.synopsis}
          </h3>
        )}
        {movie.details && (
          <h3 className="text-lg font-bold text-white">
            {movie.details.language}
          </h3>
        )} */}
        {/* {movie.details && (
          <h3 className="text-lg font-bold text-white">
            {movie.details.budgetSize}
            {movie.details.currency}
          </h3>
        )} */}
      </div>
      <div className="p-1"></div>
      <div className="grid grid-cols-2">
        <div className="p-1"></div>
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => navigate("/deletemovie", { state: movie })}
            className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30 transition-all cursor-pointer"
          >
            Delete
          </button>

          <button
            // TODO create the Edit page and navigate to it
            onClick={() => navigate("/editmovie", { state: movie })}
            className="bg-purple-600 hover:bg-purple-700 text-white hover:text-white px-4 py-2 rounded-lg text-sm font-semibold border border-purple-400 transition-all cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
