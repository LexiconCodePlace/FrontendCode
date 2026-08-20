import { useNavigate } from "react-router-dom";
import { API_URL, type IMovie } from "../Interfaces.ts";
import { useState } from "react";

export default function EditMovie() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  async function save(movie: IMovie) {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      if (!response.ok)
        throw new Error(
          `Could not add movie (id: ${movie.id}, title: ${movie.title}`,
        );
    } catch (error) {
      console.error("Error when updating movie!", error);
    } finally {
      navigate("/movielist");
    }
  }

  function handleOnSave() {
    setError("");
    if (!title.trim() || !year.trim() || !duration.trim) {
      setError("Please fill in the fields for Title, Year, and Duration!");
      return;
    }

    const yearRegex: RegExp = /^\d{4}/i;
    const correctFormat: boolean = yearRegex.test(year.trim());
    if (!correctFormat) {
      setError("Please fill in the Year filed with a valid year number!");
      return;
    }

    const durationRegex: RegExp = /^\d{2}:\d{2}:\d{2}/i;
    const durationCorrectFormat: boolean = durationRegex.test(duration.trim());
    if (!durationCorrectFormat) {
      setError("Please fill in the Duratin filed with a valid duration!");
      return;
    }

    setError("");

    const movie: IMovie = {
      title: title.trim(),
      year: parseInt(year.trim()),
      duration: duration.trim(),
      description: description.trim(),
      actors: [],
      genres: [],
    };

    save(movie);
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div id="main" className="grid grid-cols-2 gap-3 justify-evenly">
        <label className="font-semibold">Title</label>
        <input
          className="border rounded border-solid border-gray-700"
          type="text"
          id="title"
          value={title}
          placeholder="My Movie Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="font-semibold">Year</label>
        <input
          className="border rounded border-solid border-gray-700"
          type="text"
          id="year"
          value={year}
          placeholder="2026"
          onChange={(e) => setYear(e.target.value)}
        />

        <label className="font-semibold">Duration</label>
        <input
          className="border rounded border-solid border-gray-700"
          type="text"
          id="duration"
          value={duration}
          placeholder="02:30:00"
          onChange={(e) => setDuration(e.target.value)}
        />

        <label className="font-semibold">Description</label>
        <textarea
          className="border rounded border-solid border-gray-700"
          id="description"
          value={description}
          placeholder="My movie Description"
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
      <label className="font-semibold">Synopsis</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="synopsis"
        value={movie.details?.synopsis}

      />

      <label className="font-semibold">Budget Size</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="budget-size"
        value={movie.details?.budgetSize}

      />

      <label className="font-semibold">Currency</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="currency"
        value={movie.details?.currency}

      />

      <label className="font-semibold">Language</label>
      <input
        className="border rounded border-solid border-gray-700"
        type="text"
        id="language"
        value={movie.details?.language}

      />

      <label className="font-semibold">Genres</label>
      <select name="genres" id="genres" multiple>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>

      <label className="font-semibold">Actors</label>
      <select name="actors" id="actors" multiple>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select> */}
      </div>
    </>
  );
}
