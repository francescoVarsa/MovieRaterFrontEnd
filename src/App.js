import { useEffect, useState } from 'react';
import './App.css';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import MovieList from './components/movie-list';

function App() {

  const URL = 'http://127.0.0.1:8000/api/movies/'
  const FETCH_OPTIONS = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token c0b0b6b206e6978566cacde8a845eae33416548a'
    }
  }

  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [editedMovie, setEditedMovie] = useState(null)


  useEffect(() => {
    fetch(URL, FETCH_OPTIONS)
      .then(resp => resp.json())
      .then(resp => setMovies(resp))
      .catch(error => console.log(error))
  }, [])

  const loadMovie = movie => {
    setSelectedMovie(movie)
    setEditedMovie(null)
  }
  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }
  const updatedMovies = movie => {
    const newMovies = movies.map(mov => {
      if (mov.id === movie.id) {
        return movie
      }
      return mov
    })
    setMovies(newMovies)
  }
  const newMovie = () => {
    setEditedMovie({
      title: "",
      description: ""
    })
    setSelectedMovie(null)
  }

  const movieCreated = (movie) => {
    const newMovies = [...movies, movie]
    setMovies(newMovies)
  }

  const removeClicked = movie => {
    const newMovies = movies.filter((mov) => mov.id !== movie.id)
    setMovies(newMovies)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked} />
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovies={updatedMovies} movieCreated={movieCreated} /> : null}
      </div>
    </div>
  );
}

export default App;
