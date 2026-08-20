import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, type IMovie } from "../Interfaces.ts";
import { useState } from "react";

export default function EditMovie() {
  const navigate = useNavigate();
  const location = useLocation();
  const movie: IMovie = location.state as IMovie;

  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(`${movie.year}`);
  const [duration, setDuration] = useState(movie.duration);
  const [description, setDescription] = useState(movie.description || "");

  async function handleOnSave() {
    try {
      const newMovie: IMovie = {
        id: movie.id,
        title: title,
        year: parseInt(year),
        duration: duration,
        description: description,
        details: movie.details,
        actors: movie.actors,
        genres: movie.genres,
      };
      const response = await fetch(`${API_URL}/${movie.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok)
        throw new Error(
          `Could not update movie (id: ${movie.id}, title: ${movie.title}`,
        );
    } catch (error) {
      console.error("Error when updating movie!", error);
    } finally {
      navigate("/movielist");
    }
  }

  return (
    <div id="main" className="grid grid-cols-2 gap-3 justify-evenly">
      <label>Title</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Year</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <label>Duration</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <label>Description</label>
      <textarea
        className="border rounded border-solid border-gray-700"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={() => navigate("/movielist")}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Cancel
      </button>

      <button
        onClick={() => handleOnSave()}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Save
      </button>

      {/* 
      <label>Synopsis</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="synopsis"
        value={movie.details?.synopsis}

      />

      <label>Budget Size</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="budget-size"
        value={movie.details?.budgetSize}

      />

      <label>Currency</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="currency"
        value={movie.details?.currency}

      />

      <label>Language</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="language"
        value={movie.details?.language}

      />

      <label>Genres</label>
      <select name="genres" id="genres" multiple>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>

      <label>Actors</label>
      <select name="actors" id="actors" multiple>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select> */}
    </div>
  );
}
