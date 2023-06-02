import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieForAdmin, updateMovie } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../MovieListItem";
import NotFoundText from "../NotFoundText";

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchMovies = async (val) => {
    const { error, results } = await searchMovieForAdmin(val);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...results]);
  };

  const handleAfterDelete = (movie) => {
    const updatedMovies = movies.filter((m) => m.id !== movie.id);
    setMovies([...updatedMovies]);
  };

  const handleAfterUpdate = (movie) => {
    console.log("run");
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  return (
    <div className="p-5 space-y-3">
      <NotFoundText text="Record not found!" visible={resultNotFound} />
      {!resultNotFound &&
        movies.map((movie) => {
          return (
            <MovieListItem
              movie={movie}
              key={movie.id}
              afterDelete={handleAfterDelete}
              afterUpdate={handleAfterUpdate}
            />
          );
        })}
    </div>
  );
}
