import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../Interfaces.ts";
import type { IMovie } from "../Interfaces.ts";

export default function DeleteMovieDialog() {
  const navigate = useNavigate();
  const location = useLocation();
  const movie: IMovie = location.state as IMovie;

  async function handleDelete() {
    try {
      const response = await fetch(`${API_URL}/${movie.id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(
          `Could not delete movie (id: ${movie.id}, title: ${movie.title}`,
        );
    } catch (error) {
      console.error("Error when deleting movie!", error);
    } finally {
      navigate("/movielist");
    }
  }

  return (
    <>
      <div className=" grid grid-cols-1 mt-6">
        <h3 className="text-lg font-bold">
          Are you sure that you want to delete the movie?
        </h3>
        <h3 className="text-lg font-bold">{movie.title}</h3>
      </div>
      <div
        key={movie.id}
        // className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center shadow-md"
        className="grid grid-cols-2 gap-3 justify-evenly"
      >
        <button
          onClick={() => {
            handleDelete();
          }}
          className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30 transition-all cursor-pointer"
        >
          Yes
        </button>

        <button
          onClick={() => navigate("/movielist")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          No
        </button>
      </div>
    </>
  );
}
