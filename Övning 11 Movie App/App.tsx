import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-loaded pages
const NotFound = lazy(() => import("./pages/NotFound"));
const MovieList = lazy(() => import("./pages/MovieList"));
const DeleteMovie = lazy(() => import("./pages/DeleteMovie"));
const EditMovie = lazy(() => import("./pages/EditMovie"));
const AddMovie = lazy(() => import("./pages/AddMovie"));

export default function App() {
  return (
    <Suspense fallback={<div>Laddar...</div>}>
      <Routes>
        <Route index element={<MovieList />} />
        <Route path="movielist" element={<MovieList />} />
        <Route path="deletemovie" element={<DeleteMovie />} />
        <Route path="editmovie" element={<EditMovie />} />
        <Route path="addmovie" element={<AddMovie />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
