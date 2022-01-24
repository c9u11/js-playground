import Movie from "../../components/js/Movie";
import { useEffect, useState } from "react";
import { func } from "prop-types";

function Home() {
  const [loading, setLoading] = useState(true);
  const [mainOffset, setMainOffset] = useState(0);
  const [movies, setMovies] = useState([]);
  const [lastestMovies, setLastestMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  const getLastestMovie = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?sort_by=like_count&limit=5`
      )
    ).json();
    setLastestMovies(json.data.movies);
  };
  const leftBtnClickHandler = function (event) {
    event.target.disabled = true;
    setTimeout(() => {
      event.target.disabled = false;
    }, 600);
    const movieMainEl = document.querySelector(".movie-main");
    if (movieMainEl.classList.contains("noAni")) return;
    const movieEl = document.querySelector(".movie-main .movie");
    const movieElWidth = movieEl.offsetWidth + movieEl.offsetLeft * 2;
    const bodyWidth = document.body.offsetWidth;
    const minOffset = (bodyWidth - movieElWidth) / 2 - movieElWidth * 2;
    const maxOffset = (bodyWidth - movieElWidth) / 2 - movieElWidth * 6;
    setMainOffset((current) => {
      if (minOffset < current + movieElWidth) {
        setTimeout(() => {
          movieMainEl.classList.add("noAni");
          setMainOffset(() => {
            setTimeout(() => {
              movieMainEl.classList.remove("noAni");
            }, 10);
            return maxOffset;
          });
        }, 600);
      }
      return current + movieElWidth;
    });
  };
  const rightBtnClickHandler = function (event) {
    event.target.disabled = true;
    setTimeout(() => {
      event.target.disabled = false;
    }, 600);
    const movieMainEl = document.querySelector(".movie-main");
    if (movieMainEl.classList.contains("noAni")) return;
    const movieEl = document.querySelector(".movie-main .movie");
    const movieElWidth = movieEl.offsetWidth + movieEl.offsetLeft * 2;
    const bodyWidth = document.body.offsetWidth;
    const minOffset = (bodyWidth - movieElWidth) / 2 - movieElWidth * 2;
    const maxOffset = (bodyWidth - movieElWidth) / 2 - movieElWidth * 6;
    setMainOffset((current) => {
      if (maxOffset > current - movieElWidth) {
        setTimeout(() => {
          movieMainEl.classList.add("noAni");
          setMainOffset(() => {
            setTimeout(() => {
              movieMainEl.classList.remove("noAni");
            }, 10);
            return minOffset;
          });
        }, 600);
      }
      return current - movieElWidth;
    });
  };
  const setMainPosition = () => {
    const movieEl = document.querySelector(".movie-main .movie");
    const movieElWidth = movieEl.offsetWidth + movieEl.offsetLeft * 2;
    const bodyWidth = document.body.offsetWidth;
    setMainOffset(() => (bodyWidth - movieElWidth) / 2 - movieElWidth * 2);
  };
  useEffect(() => {
    getLastestMovie();
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="movie-main-wrapper">
            <button
              className="main-left-btn"
              onClick={leftBtnClickHandler}
            ></button>
            <div
              className="movie-main"
              style={{ transform: `translate(${mainOffset}px,0px)` }}
            >
              <Movie
                id={lastestMovies[lastestMovies.length - 2].id}
                coverImage={
                  lastestMovies[lastestMovies.length - 2].medium_cover_image
                }
                title={lastestMovies[lastestMovies.length - 2].title}
                year={lastestMovies[lastestMovies.length - 2].year}
                summary={lastestMovies[lastestMovies.length - 2].summary}
                genres={lastestMovies[lastestMovies.length - 2].genres}
                onload={setMainPosition}
              />
              <Movie
                id={lastestMovies[lastestMovies.length - 1].id}
                coverImage={
                  lastestMovies[lastestMovies.length - 1].medium_cover_image
                }
                title={lastestMovies[lastestMovies.length - 1].title}
                year={lastestMovies[lastestMovies.length - 1].year}
                summary={lastestMovies[lastestMovies.length - 1].summary}
                genres={lastestMovies[lastestMovies.length - 1].genres}
              />
              {lastestMovies.map((lastestMovies) => (
                <Movie
                  key={lastestMovies.id}
                  id={lastestMovies.id}
                  coverImage={lastestMovies.medium_cover_image}
                  title={lastestMovies.title}
                  year={lastestMovies.year}
                  summary={lastestMovies.summary}
                  genres={lastestMovies.genres}
                />
              ))}
              <Movie
                id={lastestMovies[0].id}
                coverImage={lastestMovies[0].medium_cover_image}
                title={lastestMovies[0].title}
                year={lastestMovies[0].year}
                summary={lastestMovies[0].summary}
                genres={lastestMovies[0].genres}
              />
              <Movie
                id={lastestMovies[1].id}
                coverImage={lastestMovies[1].medium_cover_image}
                title={lastestMovies[1].title}
                year={lastestMovies[1].year}
                summary={lastestMovies[1].summary}
                genres={lastestMovies[1].genres}
              />
            </div>
            <button
              className="main-right-btn"
              onClick={rightBtnClickHandler}
            ></button>
          </div>
          <div className="movie-list">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImage={movie.medium_cover_image}
                title={movie.title}
                year={movie.year}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
