import { projectFirestore } from "./firebase/config";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  // useState for form
  const [moviesTitle, setMoviesTitle] = useState("")
  const [moviesMinage, setMoviesMinage] = useState(null)
  const [moviesTime, setMoviesTime] = useState(null)

  useEffect(() => {
    const unsubscribe = projectFirestore.collection('movies').onSnapshot(
      (snapshot) => {

      if (snapshot.empty) {
        setError('No movies to render.')
        setData([])
      } else {
        let result = []
        snapshot.docs.forEach((oneMovie) => {
          result.push({id: oneMovie.id, ...oneMovie.data()})
        })
        setData(result)
        setError("")
      }
    }, (error) => {setError(error.message)})

    return () => unsubscribe()
  }, [])

  const deleteMovie = (id) => {
    projectFirestore.collection('movies').doc(id).delete()
  }

 

  const submitForm = async (event) => {
    event.preventDefault()
    const newMovie = {title: moviesTitle, minage: moviesMinage, time: moviesTime}

    try {
      await projectFirestore.collection('movies').add(newMovie)
      setMoviesTitle("")
      setMoviesMinage("")
      setMoviesTime("")
    } catch (error) {
      setError(error.message)
    }
  }

  return <div className="all-movies">
    <form onSubmit={submitForm}>
      <input type="text" onChange={ (event) => setMoviesTitle(event.target.value)} placeholder="Title" value={moviesTitle}/><br />
      <input type="number" onChange={ (event) => setMoviesMinage(event.target.value)} placeholder="Minage" min="0" value={moviesMinage}/><br />
      <input type="number" onChange={ (event) => setMoviesTime(event.target.value)} placeholder="Time" min="0" value={moviesTime} /><br />
      <button type="submit" value="Add">Add</button>
    </form>

    {error && <p>{error}</p>}
    {data.map((oneMovie) => {
      const {id, title, minage, time} = oneMovie

      return <div key={id} className="one-movie">
        <p>{title} {time} minutes, {minage} +</p>
        <button type="button" onClick={() => deleteMovie(id) }>Delete</button>
      </div>
    })}
  </div>
}

export default App