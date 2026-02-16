import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const nowPlayingmovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );

  const popularMovies = useSelector((store) => store.movies.popularMovies);
  if (!nowPlayingmovies) return;

  return (
    nowPlayingmovies && (
      <div className="bg-black">
        <div className="-mt-52 pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={nowPlayingmovies} />
          <MovieList title={"Trending"} movies={nowPlayingmovies} />
          <MovieList title={"Popular"} movies={popularMovies} />
          <MovieList title={"Upcoming movies"} movies={nowPlayingmovies} />
          <MovieList title={"Horror"} movies={nowPlayingmovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
