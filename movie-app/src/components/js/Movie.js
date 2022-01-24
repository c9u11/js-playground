import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import "../css/Movie.css";

function Movie({ id, coverImage, title, year, summary, genres, onload }) {
  return (
    <div className="movie" onLoad={onload}>
      <img src={coverImage} alt={title} />
      <div className="movie-info">
        <h2 className="movie-title">
          <Link to={`/movie/${id}`}>
            {title} ({year})
          </Link>
        </h2>
        <p className="movie-summary">
          {summary.length > 50 ? `${summary.slice(0, 50)}...` : summary}
        </p>
        <ul className="movie-genres">
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
